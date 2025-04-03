import { Aggregate, Label, Metadata, Spec } from '@eivo/llm';
import { EivoEntity } from '../../../common/entity/eivo-entity.entity';
import { EivoLabeledEntity } from '../../../common/entity/eivo-labeled-entity.entity';
import { CultureCode, Translation } from '../../../common/entity/i18n';
import { Curriculum } from '../curriculum.entity';
import { Exercise } from '../exercise.entity';
import { Lesson } from '../lesson.entity';
import { Material } from '../material.entity';
import { Unit } from '../unit.entity';
import { Syllabus } from '../syllabus.entity';

class MetadataWithEntity extends Metadata {
  entity!: string;
}

export function convert<T extends EivoEntity>(s: Spec[]): T[];
export function convert<T extends EivoEntity>(s: Spec): T;
export function convert<T extends EivoEntity>(s: Spec | Spec[]): T | T[] {
  return Array.isArray(s) ? s.map((p) => doConvert<T>(p)) : doConvert<T>(s);
}

function doConvert<T extends EivoEntity>(s: Spec): T {
  const metadata = s.metadata as MetadataWithEntity;
  if (!metadata) {
    throw new Error(
      `The spec ${s.metadata.name} does not have an entity defined and cannot be transformed.`,
    );
  }
  const converters = CONVERTERS_MAP.get(metadata.entity);
  if (!converters) {
    throw new Error(`Transformer ${metadata.entity} not found`);
  }
  const res = converters.convert(s) as T;
  if (!res)
    throw new Error(
      `The converter for ${metadata.entity} not produced a result.`,
    );
  return res;
}

abstract class Converter<T extends EivoEntity, S extends Spec> {
  abstract create(): T;
  convert(a: S): T {
    const curr = this.create();
    return curr;
  }
}

abstract class EivoLabeledEntityConverter<
  T extends EivoLabeledEntity<T>,
> extends Converter<T, Aggregate> {
  abstract setChildren(t: T, e: Spec[]): void;
  override convert(a: Aggregate): T {
    const e = super.convert(a);
    e.translations = this.convertLabel(e, a.labels);
    this.setChildren(e, a.def);
    return e;
  }

  convertLabel<T>(
    curriculum: T,
    labels: Array<Label>,
  ): Array<Translation<T>> {
    const translations: Translation<T>[] = [];
    for (const label of labels) {
      const translation = {
        id: 0,
        culture: label.culture as CultureCode,
        base: curriculum,
      } as Translation<T>;
      if (label.title !== undefined)
        translation['title' as keyof Translation<T>] = label.title as any;
      if (label.overview !== undefined)
        translation['overview' as keyof Translation<T>] = label.overview as any;
      if (label.details !== undefined)
        translation['details' as keyof Translation<T>] = label.details as any;
      translations.push(translation);
    }
    return translations;
  }
}
class CurriculumConverter extends EivoLabeledEntityConverter<Curriculum> {
  create(): Curriculum {
    return new Curriculum();
  }
  setChildren(t: Curriculum, e: Spec[]): void {
    t.syllabuses = convert(e);
  }
}

class SyllabusConverter extends EivoLabeledEntityConverter<Syllabus> {
  create(): Syllabus {
    return new Syllabus();
  }
  setChildren(t: Syllabus, e: Spec[]): void {
    t.units = convert(e);
  }
}

class UnitConverter extends EivoLabeledEntityConverter<Unit> {
  create(): Unit {
    return new Unit();
  }
  setChildren(t: Unit, e: Spec[]): void {
    t.lessons = convert(e);
  }
}

class LessonConverter extends EivoLabeledEntityConverter<Lesson> {
  create(): Lesson {
    return new Lesson();
  }
  setChildren(t: Lesson, e: Spec[]): void {
    t.exercises = convert(
      e.filter((p) => (p.metadata as MetadataWithEntity).entity == 'exercise'),
    );
    t.materials = convert(
      e.filter((p) => (p.metadata as MetadataWithEntity).entity == 'material'),
    );
  }
}

class ExerciseConverter extends EivoLabeledEntityConverter<Exercise> {
  create(): Exercise {
    return new Exercise();
  }
  setChildren(t: Exercise, e: Spec[]): void {}
}

class MaterialConverter extends EivoLabeledEntityConverter<Material> {
  create(): Material {
    return new Material();
  }
  setChildren(t: Material, e: Spec[]): void {}
}

const CONVERTERS_MAP: Map<string, Converter<EivoEntity, Spec>> = new Map<
  string,
  Converter<EivoEntity, Spec>
>([
  ['curriculum', new CurriculumConverter()],
  ['syllabus', new SyllabusConverter()],
  ['unit', new UnitConverter()],
  ['lesson', new LessonConverter()],
  ['exercise', new ExerciseConverter()],
  ['material', new MaterialConverter()],
]);
