SELECT DISTINCT "distinctAlias"."Curriculum_id" AS "ids_Curriculum_id"
FROM (
    SELECT "Curriculum"."id" AS "Curriculum_id",
      "Curriculum"."namespace_id" AS "Curriculum_namespace_id",
      "Curriculum__Curriculum_translations"."id" AS "Curriculum__Curriculum_translations_id",
      "Curriculum__Curriculum_translations"."language_code" AS "Curriculum__Curriculum_translations_language_code",
      "Curriculum__Curriculum_translations"."name" AS "Curriculum__Curriculum_translations_name",
      "Curriculum__Curriculum_translations"."base_id" AS "Curriculum__Curriculum_translations_base_id",
      "Curriculum__Curriculum_translations"."description_short" AS "Curriculum__Curriculum_translations_description_short",
      "Curriculum__Curriculum_translations"."description_long" AS "Curriculum__Curriculum_translations_description_long",
      "Curriculum__Curriculum_subjects"."id" AS "Curriculum__Curriculum_subjects_id",
      "Curriculum__Curriculum_subjects"."curriculum_id" AS "Curriculum__Curriculum_subjects_curriculum_id",
      "abbb52f7e1228320fe7d73dd535758b960889744"."id" AS "abbb52f7e1228320fe7d73dd535758b960889744_id",
      "abbb52f7e1228320fe7d73dd535758b960889744"."language_code" AS "abbb52f7e1228320fe7d73dd535758b960889744_language_code",
      "abbb52f7e1228320fe7d73dd535758b960889744"."name" AS "abbb52f7e1228320fe7d73dd535758b960889744_name",
      "abbb52f7e1228320fe7d73dd535758b960889744"."base_id" AS "abbb52f7e1228320fe7d73dd535758b960889744_base_id",
      "abbb52f7e1228320fe7d73dd535758b960889744"."description_short" AS "abbb52f7e1228320fe7d73dd535758b960889744_description_short",
      "abbb52f7e1228320fe7d73dd535758b960889744"."description_long" AS "abbb52f7e1228320fe7d73dd535758b960889744_description_long",
      "dc962db349bee84a11eda447bdea202f19755943"."id" AS "dc962db349bee84a11eda447bdea202f19755943_id",
      "dc962db349bee84a11eda447bdea202f19755943"."small_image" AS "dc962db349bee84a11eda447bdea202f19755943_small_image",
      "dc962db349bee84a11eda447bdea202f19755943"."big_image" AS "dc962db349bee84a11eda447bdea202f19755943_big_image",
      "dc962db349bee84a11eda447bdea202f19755943"."subject_id" AS "dc962db349bee84a11eda447bdea202f19755943_subject_id",
      "e1796237532d3c5a831d8f8952756dafdea334f5"."id" AS "e1796237532d3c5a831d8f8952756dafdea334f5_id",
      "e1796237532d3c5a831d8f8952756dafdea334f5"."prompt" AS "e1796237532d3c5a831d8f8952756dafdea334f5_prompt",
      "e1796237532d3c5a831d8f8952756dafdea334f5"."unit_id" AS "e1796237532d3c5a831d8f8952756dafdea334f5_unit_id",
      "8e10239929b556832519a29ef12bf57997767f3c"."id" AS "8e10239929b556832519a29ef12bf57997767f3c_id",
      "8e10239929b556832519a29ef12bf57997767f3c"."kind" AS "8e10239929b556832519a29ef12bf57997767f3c_kind",
      "8e10239929b556832519a29ef12bf57997767f3c"."theme" AS "8e10239929b556832519a29ef12bf57997767f3c_theme",
      "8e10239929b556832519a29ef12bf57997767f3c"."type" AS "8e10239929b556832519a29ef12bf57997767f3c_type",
      "8e10239929b556832519a29ef12bf57997767f3c"."prompt" AS "8e10239929b556832519a29ef12bf57997767f3c_prompt",
      "8e10239929b556832519a29ef12bf57997767f3c"."schema" AS "8e10239929b556832519a29ef12bf57997767f3c_schema",
      "8e10239929b556832519a29ef12bf57997767f3c"."variations" AS "8e10239929b556832519a29ef12bf57997767f3c_variations",
      "8e10239929b556832519a29ef12bf57997767f3c"."lesson_template_id" AS "8e10239929b556832519a29ef12bf57997767f3c_lesson_template_id",
      "8e10239929b556832519a29ef12bf57997767f3c"."learn_type" AS "8e10239929b556832519a29ef12bf57997767f3c_learn_type",
      "8e10239929b556832519a29ef12bf57997767f3c"."cache_enabled" AS "8e10239929b556832519a29ef12bf57997767f3c_cache_enabled",
      "8e10239929b556832519a29ef12bf57997767f3c"."cache_id" AS "8e10239929b556832519a29ef12bf57997767f3c_cache_id",
      "6f9f088f3166872fb895ca2e896966df345e78f3"."id" AS "6f9f088f3166872fb895ca2e896966df345e78f3_id",
      "6f9f088f3166872fb895ca2e896966df345e78f3"."kind" AS "6f9f088f3166872fb895ca2e896966df345e78f3_kind",
      "6f9f088f3166872fb895ca2e896966df345e78f3"."theme" AS "6f9f088f3166872fb895ca2e896966df345e78f3_theme",
      "6f9f088f3166872fb895ca2e896966df345e78f3"."type" AS "6f9f088f3166872fb895ca2e896966df345e78f3_type",
      "6f9f088f3166872fb895ca2e896966df345e78f3"."prompt" AS "6f9f088f3166872fb895ca2e896966df345e78f3_prompt",
      "6f9f088f3166872fb895ca2e896966df345e78f3"."schema" AS "6f9f088f3166872fb895ca2e896966df345e78f3_schema",
      "6f9f088f3166872fb895ca2e896966df345e78f3"."variations" AS "6f9f088f3166872fb895ca2e896966df345e78f3_variations",
      "6f9f088f3166872fb895ca2e896966df345e78f3"."lesson_template_id" AS "6f9f088f3166872fb895ca2e896966df345e78f3_lesson_template_id",
      "6f9f088f3166872fb895ca2e896966df345e78f3"."learn_type" AS "6f9f088f3166872fb895ca2e896966df345e78f3_learn_type",
      "6f9f088f3166872fb895ca2e896966df345e78f3"."cache_enabled" AS "6f9f088f3166872fb895ca2e896966df345e78f3_cache_enabled",
      "6f9f088f3166872fb895ca2e896966df345e78f3"."cache_id" AS "6f9f088f3166872fb895ca2e896966df345e78f3_cache_id"
    FROM "app"."curriculum" "Curriculum"
      LEFT JOIN "app"."curriculum_translation" "Curriculum__Curriculum_translations" ON "Curriculum__Curriculum_translations"."base_id" = "Curriculum"."id"
      LEFT JOIN "app"."subject" "Curriculum__Curriculum_subjects" ON "Curriculum__Curriculum_subjects"."curriculum_id" = "Curriculum"."id"
      LEFT JOIN "app"."subject_translation" "abbb52f7e1228320fe7d73dd535758b960889744" ON "abbb52f7e1228320fe7d73dd535758b960889744"."base_id" = "Curriculum__Curriculum_subjects"."id"
      LEFT JOIN "app"."unit" "dc962db349bee84a11eda447bdea202f19755943" ON "dc962db349bee84a11eda447bdea202f19755943"."subject_id" = "Curriculum__Curriculum_subjects"."id"
      LEFT JOIN "app"."lesson_template" "e1796237532d3c5a831d8f8952756dafdea334f5" ON "e1796237532d3c5a831d8f8952756dafdea334f5"."unit_id" = "dc962db349bee84a11eda447bdea202f19755943"."id"
      LEFT JOIN "app"."exercise_template" "8e10239929b556832519a29ef12bf57997767f3c" ON "8e10239929b556832519a29ef12bf57997767f3c"."lesson_template_id" = "e1796237532d3c5a831d8f8952756dafdea334f5"."id"
      LEFT JOIN "app"."material_template" "6f9f088f3166872fb895ca2e896966df345e78f3" ON "6f9f088f3166872fb895ca2e896966df345e78f3"."lesson_template_id" = "e1796237532d3c5a831d8f8952756dafdea334f5"."id"
      LEFT JOIN "app"."namespace" "Curriculum__Curriculum_namespace" ON "Curriculum__Curriculum_namespace"."id" = "Curriculum"."namespace_id"
    WHERE (
        ("Curriculum"."id" = 3)
        AND ((("Curriculum__Curriculum_namespace"."id" = 3)))
        AND (
          (
            (
              "Curriculum__Curriculum_translations"."language_code" = 'us'
            )
          )
        )
      )
  ) "distinctAlias"
ORDER BY "Curriculum_id" ASC
LIMIT 1