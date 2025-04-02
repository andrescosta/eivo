import { Aggregate, Label, Metadata, Spec } from '@eivo/llm';
import { Curriculum } from '../../entities/Curriculum.entity';
import { Exercise } from '../../entities/Exercise.entity';
import { Lesson } from '../../entities/Lesson.entity';
import { Material } from '../../entities/Material.entity';
import { Syllabus } from '../Syllabus.entity';
import { Unit } from '../../entities/Unit.entity';
import { EivoEntity, EivoLabeledEntity } from '../../../common/entities/EivoEntity.entity';
import { Translation, CultureCode } from '../../../common/entities/i18n';

class MetadataWithEntity extends Metadata {
  entity!: string;
}

export function transform<T extends EivoEntity>(s: Spec[]): T[];
export function transform<T extends EivoEntity>(s: Spec): T;
export function transform<T extends EivoEntity>(s: Spec | Spec[]): T | T[] {
  return Array.isArray(s) ? s.map((p) => doTransform<T>(p)) : doTransform<T>(s);
}

function doTransform<T extends EivoEntity>(s: Spec): T {
  const metadata = s.metadata as MetadataWithEntity;
  if (!metadata) {
    throw new Error(
      `The spec ${s.metadata.name} does not have an entity defined and cannot be transformed.`,
    );
  }
  const transformer = SPECS_MAP.get(metadata.entity);
  if (!transformer) {
    throw new Error(`Transformer ${metadata.entity} not found`);
  }
  const res = transformer.transform(s) as T;
  if (!res)
    throw new Error(
      `The transformer for ${metadata.entity} not produced a result.`,
    );
  return res;
}

abstract class Transformer<T extends EivoEntity, S extends Spec> {
  abstract create(): T;
  transform(a: S): T {
    const curr = this.create();
    return curr;
  }
}

abstract class TransformEivoLabeledEntity<
  T extends EivoLabeledEntity<T>,
> extends Transformer<T, Aggregate> {
  abstract setChildren(t: T, e: Spec[]): void;
  override transform(a: Aggregate): T {
    const e = super.transform(a);
    e.translations = this.transformLabel(e, a.labels);
    this.setChildren(e, a.def);
    return e;
  }

  transformLabel<T>(
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
class CurriculumTransformer extends TransformEivoLabeledEntity<Curriculum> {
  create(): Curriculum {
    return new Curriculum();
  }
  setChildren(t: Curriculum, e: Spec[]): void {
    t.syllabuses = transform(e);
  }
}

class SyllabusTransformer extends TransformEivoLabeledEntity<Syllabus> {
  create(): Syllabus {
    return new Syllabus();
  }
  setChildren(t: Syllabus, e: Spec[]): void {
    t.units = transform(e);
  }
}

class UnitTransformer extends TransformEivoLabeledEntity<Unit> {
  create(): Unit {
    return new Unit();
  }
  setChildren(t: Unit, e: Spec[]): void {
    t.lessons = transform(e);
  }
}

class LessonTransformer extends TransformEivoLabeledEntity<Lesson> {
  create(): Lesson {
    return new Lesson();
  }
  setChildren(t: Lesson, e: Spec[]): void {
    t.exercises = transform(
      e.filter((p) => (p.metadata as MetadataWithEntity).entity == 'exercise'),
    );
    t.materials = transform(
      e.filter((p) => (p.metadata as MetadataWithEntity).entity == 'material'),
    );
  }
}

class ExerciseTransformer extends TransformEivoLabeledEntity<Exercise> {
  create(): Exercise {
    return new Exercise();
  }
  setChildren(t: Exercise, e: Spec[]): void {}
}

class MaterialTransformer extends TransformEivoLabeledEntity<Material> {
  create(): Material {
    return new Material();
  }
  setChildren(t: Material, e: Spec[]): void {}
}

const SPECS_MAP: Map<string, Transformer<EivoEntity, Spec>> = new Map<
  string,
  Transformer<EivoEntity, Spec>
>([
  ['curriculum', new CurriculumTransformer()],
  ['syllabus', new SyllabusTransformer()],
  ['unit', new UnitTransformer()],
  ['lesson', new LessonTransformer()],
  ['exercise', new ExerciseTransformer()],
  ['material', new MaterialTransformer()],
]);
