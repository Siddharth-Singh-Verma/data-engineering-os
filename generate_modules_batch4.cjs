const fs = require('fs');

const existingModules = JSON.parse(fs.readFileSync('src/data/modules.json', 'utf8'));

const newModules = [
// ═══════════════════════════════════════════════════════════════════
// DATA MODELING
// ═══════════════════════════════════════════════════════════════════
{
  id: "er-model", title: "Entity-Relationship (ER) Modeling", phase: "modeling", phaseLabel: "Data Modeling",
  description: "Understand the fundamentals of relational data modeling — entities, attributes, and relationships (1:1, 1:N, M:N).",
  difficulty: "beginner", estimatedHours: 2, importance: "must-know", interviewWeight: 3,
  careerLevel: "foundation", interviewImportance: 3, productionImportance: 3,
  interviewRecommendation: "Know Concept — basic building block of databases",
  prerequisites: ["oltp-vs-olap"], learningObjectives: [
    "Identify entities and attributes from business requirements",
    "Define primary keys and foreign keys",
    "Model one-to-one, one-to-many, and many-to-many relationships"
  ],
  problemItSolves: "Before creating tables in a database, you need a blueprint of how business concepts relate to each other to avoid data redundancy and integrity issues.",
  whyItExists: "Created by Peter Chen in 1976, the ER model became the standard way to design relational databases.",
  realWorldUsage: "Data engineers use ER diagrams (ERDs) to document the structure of source OLTP systems before extracting data from them.",
  theory: "## ER Modeling\n\n### Core Components\n- **Entity**: A real-world object (e.g., `Customer`, `Product`)\n- **Attribute**: A property of an entity (e.g., `Name`, `Price`)\n- **Primary Key (PK)**: A unique identifier for an entity (e.g., `CustomerID`)\n- **Foreign Key (FK)**: A field that links to a PK in another table\n\n### Relationships\n1. **One-to-One (1:1)**: e.g., Employee to Badge\n2. **One-to-Many (1:N)**: e.g., Customer to Orders. The `CustomerID` FK goes in the `Orders` table.\n3. **Many-to-Many (M:N)**: e.g., Students to Courses. Requires a **junction table** (e.g., `Enrollments`) with two foreign keys.",
  resources: {
    docs: [], youtube: [], udemy: [], articles: []
  },
  miniProject: null, exercises: ["Draw an ER diagram for a library management system"],
  nextTopics: ["normalization"], previousTopics: ["unity-catalog", "sql"],
  commonMistakes: ["Trying to implement a M:N relationship without a junction table", "Using natural keys (like email) as primary keys instead of surrogate keys (UUID/Int)"],
  interviewQuestions: ["How do you resolve a many-to-many relationship in a relational database?", "What is the difference between a Primary Key and a Foreign Key?"],
  flashcards: [
    { front: "How do you model a Many-to-Many relationship?", back: "By creating a third table (junction/associative table) that contains foreign keys referencing the primary keys of the two original tables." }
  ],
  summary: "ER modeling is the blueprint of relational databases. Understand entities, primary/foreign keys, and how to resolve 1:N and M:N relationships."
},
{
  id: "normalization", title: "Normalization (1NF, 2NF, 3NF)", phase: "modeling", phaseLabel: "Data Modeling",
  description: "Learn how to normalize data to reduce redundancy and improve data integrity in OLTP systems.",
  difficulty: "intermediate", estimatedHours: 3, importance: "must-know", interviewWeight: 4,
  careerLevel: "junior", interviewImportance: 4, productionImportance: 3,
  interviewRecommendation: "Learn Well — very common SQL/Modeling interview question",
  prerequisites: ["er-model"], learningObjectives: [
    "Understand the goal of normalization (reduce redundancy, prevent anomalies)",
    "Define 1NF, 2NF, and 3NF",
    "Normalize a flat file into 3NF tables",
    "Understand why we DE-normalize for analytics"
  ],
  problemItSolves: "If you store a customer's address on every single order record, updating their address requires updating 100 rows. If you miss one, your data is corrupted (update anomaly). Normalization fixes this.",
  whyItExists: "Edgar F. Codd defined normal forms in the 1970s to ensure relational databases maintained data integrity during transactions.",
  realWorldUsage: "Used heavily when designing OLTP databases. Conversely, data engineers usually DE-NORMALIZE data when moving it to a Data Warehouse to speed up read queries.",
  theory: "## Normalization\n\n### The Normal Forms\n1. **1NF (First Normal Form)**: Atomic values only. No arrays or comma-separated lists in a single column. Every row must be unique (have a PK).\n2. **2NF**: Must be in 1NF. No partial dependencies. All non-key attributes must depend on the ENTIRE primary key (relevant for composite keys).\n3. **3NF**: Must be in 2NF. No transitive dependencies. Non-key attributes cannot depend on other non-key attributes. (e.g., `City` depends on `ZipCode`, not `CustomerID` -> move `ZipCode/City` to a new table).\n\n### Denormalization\nThe process of intentionally adding redundancy back (e.g., joining tables together into one wide table) to speed up analytical read queries.",
  resources: {
    docs: [], youtube: [], udemy: [], articles: []
  },
  miniProject: null, exercises: ["Take a flat spreadsheet of sales data and normalize it to 3NF"],
  nextTopics: ["star-schema"], previousTopics: ["er-model"],
  commonMistakes: ["Normalizing data in a Data Warehouse (makes queries too slow due to massive JOINs)"],
  interviewQuestions: ["What is the difference between 2NF and 3NF?", "Why do we normalize databases?", "When would you denormalize a database?"],
  flashcards: [
    { front: "What is 3rd Normal Form (3NF)?", back: "Data is in 2NF, and there are no transitive dependencies (non-key columns don't depend on other non-key columns). 'Every non-key attribute must provide a fact about the key, the whole key, and nothing but the key.'" },
    { front: "Why do we Denormalize in Data Warehouses?", back: "Normalization requires many JOINs, which are slow on massive datasets. Denormalization (pre-joining data into wide tables or star schemas) trades storage space for faster read performance." }
  ],
  summary: "Normalization (1NF, 2NF, 3NF) reduces redundancy and prevents update anomalies in transactional databases. Data engineers often denormalize this data for analytics."
},
{
  id: "star-schema", title: "Dimensional Modeling (Star Schema)", phase: "modeling", phaseLabel: "Data Modeling",
  description: "Master the Star Schema (Ralph Kimball's methodology) — the industry standard for structuring data in a Data Warehouse.",
  difficulty: "intermediate", estimatedHours: 4, importance: "must-know", interviewWeight: 5,
  careerLevel: "junior", interviewImportance: 5, productionImportance: 5,
  interviewRecommendation: "Learn Deeply — guaranteed interview question for DE roles",
  prerequisites: ["normalization", "data-warehouse"], learningObjectives: [
    "Differentiate Fact tables and Dimension tables",
    "Design a Star Schema from business requirements",
    "Understand Snowflake schema vs Star schema"
  ],
  problemItSolves: "Highly normalized 3NF databases are too slow for analytics because they require dozens of complex JOINs. The Star Schema simplifies this into a center Fact table surrounded by Dimension tables.",
  whyItExists: "Ralph Kimball introduced Dimensional Modeling in 1996. It prioritizes query speed and business understandability over storage efficiency.",
  realWorldUsage: "The gold standard for the 'Gold' layer in Medallion architecture or Data Warehouses. Tools like PowerBI and Tableau are specifically optimized to query Star Schemas.",
  theory: "## Dimensional Modeling\n\n### Fact Tables (The 'Verbs')\n- Store measurements, metrics, or events (e.g., `Orders`, `PageViews`).\n- Contain numerical facts (`amount`, `quantity`) and foreign keys to dimensions.\n- Very long (billions of rows), very narrow.\n\n### Dimension Tables (The 'Nouns')\n- Store context about the facts (e.g., `Customers`, `Products`, `Date`).\n- Contain descriptive text attributes.\n- Very wide (many columns), relatively few rows.\n\n### Star vs Snowflake Schema\n- **Star Schema**: Dimensions are denormalized (flat). One JOIN to get from Fact to Dimension.\n- **Snowflake Schema**: Dimensions are normalized (e.g., `Product` joins to `Category`). Saves space but queries are slower.",
  resources: {
    docs: [{ title: "The Data Warehouse Toolkit (Book)", url: "https://www.amazon.com/Data-Warehouse-Toolkit-Definitive-Dimensional/dp/1118530802" }],
    youtube: [], udemy: [], articles: []
  },
  miniProject: { title: "Star Schema Design", description: "Design a Star Schema for a ride-sharing company (Uber/Lyft). Define the Fact table (Trips) and all necessary Dimension tables with their attributes.", skills: ["Data Modeling", "Business Logic"], estimatedHours: 2 },
  exercises: ["Convert a 3NF ER diagram into a Star Schema"],
  nextTopics: ["scd"], previousTopics: ["normalization"],
  commonMistakes: ["Putting textual descriptions in the Fact table instead of a Dimension", "Making a Fact table without a Date dimension"],
  interviewQuestions: ["What is the difference between a Fact and a Dimension table?", "Star Schema vs Snowflake Schema?", "Design a Star Schema for an e-commerce checkout process."],
  flashcards: [
    { front: "Fact vs Dimension Table?", back: "Fact tables contain quantitative metrics (sales amount, quantity) and foreign keys. Dimension tables contain descriptive attributes (customer name, product category) that provide context to the facts." },
    { front: "Star vs Snowflake Schema?", back: "Star schema has denormalized dimensions (faster reads, more storage). Snowflake schema has normalized dimensions (slower reads, less storage)." }
  ],
  summary: "The Star Schema is the standard for analytics. It consists of a central Fact table (metrics/events) surrounded by denormalized Dimension tables (context)."
},
{
  id: "scd", title: "Slowly Changing Dimensions (SCD)", phase: "modeling", phaseLabel: "Data Modeling",
  description: "Learn how to track historical changes in Dimension tables over time using SCD Types 1, 2, and 3.",
  difficulty: "advanced", estimatedHours: 3, importance: "must-know", interviewWeight: 4,
  careerLevel: "mid", interviewImportance: 4, productionImportance: 5,
  interviewRecommendation: "Learn Deeply — very common in technical interviews",
  prerequisites: ["star-schema"], learningObjectives: [
    "Understand the problem of changing dimension data",
    "Implement SCD Type 1 (Overwrite)",
    "Implement SCD Type 2 (Add new row with dates) - Most Important",
    "Understand SCD Type 3 (Add new column)"
  ],
  problemItSolves: "If a customer moves from NY to CA, and you overwrite their address in the Dimension table, all their past NY purchases will now look like CA purchases in reports. SCDs solve this by preserving history.",
  whyItExists: "Business reporting requires accurate historical snapshots. Kimball defined SCD types to standardize how data warehouses handle changing context.",
  realWorldUsage: "SCD Type 2 is the industry standard for tracking history. Data engineers build pipelines (often using dbt snapshots or Spark MERGE) to maintain these tables.",
  theory: "## Slowly Changing Dimensions\n\n### SCD Type 1: Overwrite\n- **How**: Update the existing record.\n- **Pros**: Easy, keeps table small.\n- **Cons**: Loses all historical context.\n- **Use when**: Fixing typos, or when history doesn't matter.\n\n### SCD Type 2: Add New Row (Historical)\n- **How**: Expire the old row, insert a new active row.\n- **Implementation**: Requires surrogate keys, `is_active` boolean, `valid_from` and `valid_to` timestamps.\n- **Pros**: Perfect historical accuracy. Past facts join to the old record, new facts join to the new record.\n- **Cons**: Table grows larger, queries are more complex.\n\n### SCD Type 3: Add New Column\n- **How**: Add a `previous_state` column to the table.\n- **Pros**: Can easily compare current vs previous.\n- **Cons**: Only tracks one change of history.",
  resources: {
    docs: [], youtube: [], udemy: [], articles: []
  },
  miniProject: null, exercises: ["Write the SQL MERGE statement to perform an SCD Type 2 update"],
  nextTopics: ["dbt-core"], previousTopics: ["star-schema"],
  commonMistakes: ["Using SCD Type 1 when the business actually needed historical reporting", "Not using surrogate keys in SCD Type 2 (natural keys will duplicate!)"],
  interviewQuestions: ["What are Slowly Changing Dimensions?", "Explain the difference between SCD Type 1 and Type 2.", "How do you implement an SCD Type 2 table?"],
  flashcards: [
    { front: "SCD Type 1 vs Type 2?", back: "Type 1 OVERWRITES the old data (loses history). Type 2 creates a NEW ROW with effective dates (preserves full history)." },
    { front: "What columns are required for SCD Type 2?", back: "A Surrogate Key, the Natural Key, `valid_from` date, `valid_to` date, and an `is_active` flag." }
  ],
  summary: "SCDs handle updates to dimension data. Type 1 overwrites data. Type 2 (the standard) adds a new row with valid date ranges to preserve history."
},

// ═══════════════════════════════════════════════════════════════════
// TRANSFORMATION & dbt
// ═══════════════════════════════════════════════════════════════════
{
  id: "dbt-core", title: "Introduction to dbt (data build tool)", phase: "transformation", phaseLabel: "Transformation (dbt)",
  description: "Understand dbt — the tool that revolutionized data transformation by bringing software engineering practices to SQL.",
  difficulty: "beginner", estimatedHours: 2, importance: "must-know", interviewWeight: 4,
  careerLevel: "foundation", interviewImportance: 4, productionImportance: 5,
  interviewRecommendation: "Learn Well — essential tool in the modern data stack",
  prerequisites: ["sql", "etl-vs-elt", "star-schema"], learningObjectives: [
    "Understand dbt's role in the ELT paradigm",
    "Explain how dbt brings CI/CD and version control to SQL",
    "Understand the structure of a dbt project"
  ],
  problemItSolves: "Before dbt, data analysts wrote thousands of lines of unversioned, untested SQL in stored procedures. dbt treats SQL like application code, with version control, modularity, and automated testing.",
  whyItExists: "Created by Fishtown Analytics (now dbt Labs) in 2016. As cloud data warehouses (BigQuery/Snowflake) made the 'T' in ELT possible, a tool was needed to manage those transformations cleanly.",
  realWorldUsage: "Almost every modern data team uses dbt to transform raw data (Bronze) into analytics-ready models (Gold) inside their Data Warehouse or Lakehouse.",
  theory: "## dbt (data build tool)\n\n### What it does\ndbt executes the **T (Transform)** in ELT. It doesn't extract or load data. It assumes the data is already in your warehouse, and it executes `SELECT` statements to transform it.\n\n### Core Philosophy\n1. **SQL-first**: Anyone who knows SQL can build pipelines.\n2. **Modularity**: Break massive queries into small, reusable pieces (models).\n3. **DRY (Don't Repeat Yourself)**: Using Jinja templating.\n4. **Testing**: Built-in assertions to catch bad data.\n5. **Documentation**: Auto-generated dependency graphs and data dictionaries.",
  resources: {
    docs: [{ title: "What is dbt?", url: "https://docs.getdbt.com/docs/introduction" }],
    youtube: [], udemy: [], articles: []
  },
  miniProject: null, exercises: [],
  nextTopics: ["dbt-models"], previousTopics: ["scd"],
  commonMistakes: ["Trying to use dbt to extract data from APIs (it's only for transformation)"],
  interviewQuestions: ["What is dbt and what problem does it solve?", "Where does dbt fit in the ELT pipeline?"],
  flashcards: [
    { front: "What does dbt do?", back: "It handles the T (Transformation) in ELT. It takes raw data already loaded in a warehouse and transforms it into analytics-ready tables using version-controlled, testable SQL." }
  ],
  summary: "dbt brings software engineering best practices (version control, testing, modularity) to SQL data transformations."
},
{
  id: "dbt-models", title: "dbt Models & Materializations", phase: "transformation", phaseLabel: "Transformation (dbt)",
  description: "Learn how to write dbt models, use the ref() function to build DAGs, and configure materializations (tables, views, incremental).",
  difficulty: "intermediate", estimatedHours: 4, importance: "must-know", interviewWeight: 4,
  careerLevel: "junior", interviewImportance: 4, productionImportance: 5,
  interviewRecommendation: "Learn Deeply — you must know this to use dbt",
  prerequisites: ["dbt-core"], learningObjectives: [
    "Write dbt models using `SELECT` statements",
    "Use the `{{ ref() }}` function to build dependency graphs",
    "Understand View vs Table materializations",
    "Implement Incremental materializations"
  ],
  problemItSolves: "Manually managing the execution order of 50 SQL scripts is impossible. By using `ref()`, dbt automatically builds a DAG and figures out the correct execution order.",
  whyItExists: "dbt abstracts away the DDL (`CREATE TABLE`, `CREATE VIEW`). Analysts just write the business logic (`SELECT`), and dbt handles how it gets built in the database.",
  realWorldUsage: "Data engineers use incremental models to process only new data on massive tables, saving thousands of dollars in cloud warehouse compute costs.",
  theory: "## dbt Models\n\nA model is simply a `.sql` file containing a single `SELECT` statement.\n\n### The `ref()` Function\nInstead of hardcoding table names `FROM raw.orders`, you write `FROM {{ ref('stg_orders') }}`. dbt uses this to build the DAG and run models in the right order.\n\n### Materializations\nHow dbt builds the model in the database:\n1. **View**: `CREATE VIEW AS ...` (Runs query every time a user accesses it. Good for simple logic).\n2. **Table**: `CREATE TABLE AS ...` (Builds physical table. Good for heavy transformations).\n3. **Incremental**: Only transforms data that has changed since the last run. (Crucial for large datasets).\n4. **Ephemeral**: Doesn't build anything in the DB; compiles into a CTE in downstream models.",
  resources: {
    docs: [{ title: "dbt Materializations", url: "https://docs.getdbt.com/docs/build/materializations" }],
    youtube: [], udemy: [], articles: []
  },
  miniProject: { title: "dbt Project Setup", description: "Initialize a dbt project, connect it to a free data warehouse (e.g., Snowflake trial or local Postgres), and build a 3-layer staging, intermediate, and mart model architecture.", skills: ["dbt", "SQL", "DAGs"], estimatedHours: 3 },
  exercises: ["Write an incremental dbt model that only processes data from the last 3 days"],
  nextTopics: ["jinja-macros"], previousTopics: ["dbt-core"],
  commonMistakes: ["Using hardcoded schema names instead of `ref()` or `source()`", "Materializing a 10-billion row table as a full 'Table' every night instead of 'Incremental'"],
  interviewQuestions: ["What does the ref() function do in dbt?", "Explain the different materializations in dbt.", "How does an incremental model work?"],
  flashcards: [
    { front: "What is the purpose of the ref() function?", back: "It references another dbt model. This allows dbt to automatically infer the dependency graph (DAG) and execute models in the correct order, while managing environment-specific schemas." },
    { front: "View vs Table vs Incremental materialization?", back: "View: computes on the fly, no storage cost. Table: drops and rebuilds entirely, fast reads but expensive to build. Incremental: only processes new/changed data, efficient for huge datasets." }
  ],
  summary: "dbt models are simple SELECT statements. The ref() function builds the DAG automatically. Materializations control whether models are built as Views, Tables, or Incrementally."
},
{
  id: "jinja-macros", title: "Jinja & Macros in dbt", phase: "transformation", phaseLabel: "Transformation (dbt)",
  description: "Learn how to use Jinja templating to write DRY (Don't Repeat Yourself) SQL, use variables, and create custom macros.",
  difficulty: "advanced", estimatedHours: 3, importance: "good-to-know", interviewWeight: 2,
  careerLevel: "mid", interviewImportance: 2, productionImportance: 4,
  interviewRecommendation: "Know Concept — separates basic dbt users from advanced users",
  prerequisites: ["dbt-models"], learningObjectives: [
    "Understand Jinja syntax (`{{ }}` vs `{% %}`)",
    "Write macros to abstract repetitive SQL",
    "Use Jinja loops to dynamically generate SQL columns"
  ],
  problemItSolves: "SQL doesn't have functions or loops. If you need to pivot 50 columns, you have to write 50 lines of repetitive SQL. Jinja allows you to use programming logic (loops, if statements) to generate SQL dynamically.",
  whyItExists: "dbt combines SQL with Jinja (a Python templating engine) to give SQL the power of a modern programming language.",
  realWorldUsage: "Creating a macro to standardize how money is cast to decimals, or using a for-loop to pivot payment methods into separate columns.",
  theory: "## Jinja in dbt\n\n### Syntax\n- `{{ ... }}`: Expressions (prints output to the compiled SQL)\n- `{% ... %}`: Statements (control flow like `if`, `for`, `macro`)\n\n### Macros (Functions for SQL)\n```jinja\n{% macro cents_to_dollars(column_name) %}\n    round(cast({{ column_name }} as numeric) / 100, 2)\n{% endmacro %}\n```\nUsage in model:\n```sql\nSELECT \n  order_id,\n  {{ cents_to_dollars('amount_in_cents') }} as amount_usd\nFROM {{ ref('orders') }}\n```\n\n### Loops (For pivoting)\n```jinja\n{% set payment_methods = ['credit_card', 'paypal', 'bank_transfer'] %}\nSELECT\n  order_id,\n  {% for method in payment_methods %}\n  sum(case when payment_method = '{{method}}' then amount else 0 end) as {{method}}_amount{% if not loop.last %},{% endif %}\n  {% endfor %}\nFROM {{ ref('payments') }}\n```",
  resources: {
    docs: [], youtube: [], udemy: [], articles: []
  },
  miniProject: null, exercises: ["Write a macro that converts timestamps from UTC to a specified timezone"],
  nextTopics: ["dbt-tests"], previousTopics: ["dbt-models"],
  commonMistakes: ["Over-engineering with Jinja making the SQL unreadable for analysts"],
  interviewQuestions: ["How does Jinja enhance SQL in dbt?", "What is a dbt macro?"],
  flashcards: [
    { front: "What is a dbt Macro?", back: "A reusable piece of Jinja code (similar to a function in programming) that generates SQL. It allows you to keep your SQL DRY (Don't Repeat Yourself)." }
  ],
  summary: "Jinja brings control flow (if/for) and reusability (macros) to SQL, allowing you to dynamically generate complex queries."
},
{
  id: "dbt-tests", title: "dbt Testing & Documentation", phase: "transformation", phaseLabel: "Transformation (dbt)",
  description: "Learn how to write generic and singular tests in dbt to ensure data quality, and how to auto-generate documentation.",
  difficulty: "intermediate", estimatedHours: 3, importance: "must-know", interviewWeight: 3,
  careerLevel: "junior", interviewImportance: 3, productionImportance: 5,
  interviewRecommendation: "Learn Well — testing is a core responsibility of DEs",
  prerequisites: ["dbt-models", "data-quality"], learningObjectives: [
    "Configure out-of-the-box generic tests (unique, not_null, accepted_values, relationships)",
    "Write custom singular tests using SQL",
    "Generate and host dbt documentation"
  ],
  problemItSolves: "Pipelines often break silently due to bad source data (e.g., null values in primary keys). dbt tests run assertions against your data in the warehouse and fail the pipeline if the data is bad.",
  whyItExists: "Software engineering has unit tests; data engineering needs data tests. dbt made data testing accessible by making tests just simple YAML configurations or SQL queries.",
  realWorldUsage: "Every production dbt project has `unique` and `not_null` tests on primary keys. Advanced teams use packages like `dbt-expectations` for complex anomaly detection.",
  theory: "## dbt Testing\n\n### Generic Tests (YAML)\nDefined in `schema.yml`:\n```yaml\nmodels:\n  - name: customers\n    columns:\n      - name: customer_id\n        tests:\n          - unique\n          - not_null\n      - name: status\n        tests:\n          - accepted_values:\n              values: ['active', 'pending', 'cancelled']\n```\n\n### Singular Tests (SQL)\nCustom business logic. A test is a SQL query that returns failing rows. If it returns 0 rows, the test passes.\n```sql\n-- tests/assert_total_payment_amount_is_positive.sql\nselect order_id, total_amount \nfrom {{ ref('orders') }}\nwhere total_amount < 0\n```\n\n### Documentation\ndbt compiles your models, YAML descriptions, and tests into a static website showing the data dictionary and the DAG (`dbt docs generate`).",
  resources: {
    docs: [], youtube: [], udemy: [], articles: []
  },
  miniProject: null, exercises: ["Add unique, not_null, and relationship tests to your dbt project models"],
  nextTopics: ["airflow-intro"], previousTopics: ["jinja-macros"],
  commonMistakes: ["Not testing primary keys for uniqueness, leading to massive fan-out joins downstream"],
  interviewQuestions: ["How do you test data quality in dbt?", "What are the 4 built-in generic tests in dbt?"],
  flashcards: [
    { front: "What are the 4 built-in dbt tests?", back: "unique, not_null, accepted_values, relationships (foreign key constraint)." },
    { front: "How does a custom singular test work in dbt?", back: "It is a SQL query that selects records that VIOLATE your assumption. If the query returns 0 rows, the test passes. If it returns 1 or more rows, it fails." }
  ],
  summary: "dbt testing ensures data quality. Use generic YAML tests for standard checks (unique, not_null) and SQL singular tests for custom business logic."
},

// ═══════════════════════════════════════════════════════════════════
// ORCHESTRATION
// ═══════════════════════════════════════════════════════════════════
{
  id: "airflow-intro", title: "Introduction to Airflow", phase: "orchestration", phaseLabel: "Orchestration",
  description: "Understand Apache Airflow — the industry standard for scheduling and orchestrating data pipelines.",
  difficulty: "beginner", estimatedHours: 2, importance: "must-know", interviewWeight: 4,
  careerLevel: "foundation", interviewImportance: 4, productionImportance: 5,
  interviewRecommendation: "Learn Well — practically mandatory for modern DE roles",
  prerequisites: ["python", "data-pipeline"], learningObjectives: [
    "Understand the role of an orchestrator",
    "Define what a DAG (Directed Acyclic Graph) is in Airflow",
    "Understand why Airflow replaced Cron"
  ],
  problemItSolves: "Using `cron` to schedule scripts works until script B depends on script A finishing successfully. Airflow manages complex dependency chains, retries, and alerting when things fail.",
  whyItExists: "Created by Maxime Beauchemin at Airbnb in 2014. They needed a way to author, schedule, and monitor complex data pipelines using code (Python) rather than drag-and-drop enterprise tools.",
  realWorldUsage: "Airflow is used by thousands of companies to trigger Fivetran ingestion, wait for it to finish, run dbt transformations, and then send an email report.",
  theory: "## Apache Airflow\n\n### Core Philosophy: Configuration as Code\nPipelines are defined as Python scripts. This allows version control, testing, and dynamic generation of pipelines.\n\n### The DAG (Directed Acyclic Graph)\nA DAG is a collection of tasks with directional dependencies. \n- **Directed**: Task A goes to Task B.\n- **Acyclic**: No infinite loops (A -> B -> A is not allowed).\n\n### Airflow vs Cron\n- **Cron**: Time-based only. No concept of dependencies, retries, or monitoring UI.\n- **Airflow**: Dependency-based. Handles retries, historical backfills, alerting, and provides a rich UI.",
  resources: {
    docs: [{ title: "Airflow Documentation", url: "https://airflow.apache.org/docs/" }],
    youtube: [], udemy: [], articles: []
  },
  miniProject: null, exercises: [],
  nextTopics: ["airflow-dags"], previousTopics: ["dbt-tests"],
  commonMistakes: ["Thinking Airflow is a data processing engine (like Spark). Airflow just ORCHESTRATES; it triggers other systems to do the heavy lifting."],
  interviewQuestions: ["Why use Airflow instead of Cron?", "What is a DAG?", "What is the difference between Airflow and Spark?"],
  flashcards: [
    { front: "Airflow vs Spark?", back: "Airflow is the ORCHESTRATOR (the manager). It schedules and triggers tasks but shouldn't process big data itself. Spark is the COMPUTE ENGINE (the worker) that actually processes the terabytes of data." },
    { front: "What does DAG stand for?", back: "Directed Acyclic Graph. Directed (has a flow direction), Acyclic (no loops allowed). It represents a pipeline of tasks and their dependencies." }
  ],
  summary: "Airflow is the industry standard orchestrator. It manages dependencies, retries, and scheduling using pipelines defined as Python code (DAGs)."
},
{
  id: "airflow-dags", title: "Writing Airflow DAGs", phase: "orchestration", phaseLabel: "Orchestration",
  description: "Learn how to write DAGs in Python, define tasks, set dependencies using bitshift operators, and configure schedules.",
  difficulty: "intermediate", estimatedHours: 4, importance: "must-know", interviewWeight: 4,
  careerLevel: "junior", interviewImportance: 4, productionImportance: 5,
  interviewRecommendation: "Learn Deeply — you will write DAGs in your day-to-day job",
  prerequisites: ["airflow-intro"], learningObjectives: [
    "Write a basic DAG using the TaskFlow API (`@dag`, `@task`)",
    "Define task dependencies using `>>` and `<<`",
    "Configure DAG parameters (start_date, catchup, retries, cron syntax)"
  ],
  problemItSolves: "Translating business workflow requirements ('Run this daily, but only after the database dumps are ready') into executable code.",
  whyItExists: "Airflow's Python API makes it highly flexible. You can use standard Python `for` loops to dynamically generate 100 tasks based on a config file.",
  realWorldUsage: "Data engineers write DAGs to automate the entire ELT lifecycle, setting them to run daily (`@daily`), retrying up to 3 times on failure.",
  theory: "## Writing DAGs\n\n### Basic Structure (TaskFlow API)\n```python\nfrom airflow.decorators import dag, task\nfrom datetime import datetime\n\n@dag(start_date=datetime(2023, 1, 1), schedule='@daily', catchup=False)\ndef my_etl_pipeline():\n    \n    @task\n    def extract():\n        return \"data\"\n        \n    @task\n    def transform(data):\n        return data.upper()\n        \n    # Set dependencies naturally by passing data\n    raw_data = extract()\n    transform(raw_data)\n\n# Instantiate the DAG\ndag_instance = my_etl_pipeline()\n```\n\n### Traditional Dependencies (Bitshift)\n```python\n# Task A must run before Task B and Task C\ntask_a >> [task_b, task_c]\n\n# Task D runs after B and C finish\n[task_b, task_c] >> task_d\n```",
  resources: {
    docs: [], youtube: [], udemy: [], articles: []
  },
  miniProject: { title: "API to DB Airflow DAG", description: "Write an Airflow DAG that extracts daily weather data from a public API, transforms it, and loads it into a local Postgres database. Configure retries and run it locally.", skills: ["Airflow", "Python", "API"], estimatedHours: 4 },
  exercises: ["Write a DAG with 5 tasks forming a diamond dependency pattern (A -> B,C -> D -> E)"],
  nextTopics: ["operators"], previousTopics: ["airflow-intro"],
  commonMistakes: ["Putting heavy data processing inside an Airflow Python task (crashing the worker)", "Not understanding `start_date` and `execution_date`"],
  interviewQuestions: ["How do you define dependencies in Airflow?", "What is the 'catchup' parameter?", "What happens if a task fails in Airflow?"],
  flashcards: [
    { front: "What does catchup=True do in Airflow?", back: "When you activate a DAG, Airflow will look at the start_date. If start_date is in the past, it will automatically run all missed scheduled intervals up to the current date (Backfilling)." }
  ],
  summary: "DAGs are written in Python. Define tasks, set their order using dependencies (>>), and configure schedules and retries."
},
{
  id: "operators", title: "Operators & Sensors", phase: "orchestration", phaseLabel: "Orchestration",
  description: "Understand the building blocks of Airflow: Operators (doing work), Sensors (waiting for things), and Hooks (connecting to systems).",
  difficulty: "intermediate", estimatedHours: 3, importance: "must-know", interviewWeight: 3,
  careerLevel: "junior", interviewImportance: 3, productionImportance: 5,
  interviewRecommendation: "Learn Well — essential for integrating Airflow with the modern data stack",
  prerequisites: ["airflow-dags"], learningObjectives: [
    "Differentiate Operators, Sensors, and Hooks",
    "Use common operators (PythonOperator, BashOperator, PostgresOperator)",
    "Use external providers (SnowflakeOperator, SparkSubmitOperator)",
    "Implement a Sensor to wait for a file to land in S3"
  ],
  problemItSolves: "You don't want to write custom Python code to execute a Spark job, authenticate to Snowflake, or check S3 for a file. Operators are pre-built templates that do this for you.",
  whyItExists: "Airflow's strength is its massive provider ecosystem. The community has built Operators for almost every tool in existence.",
  realWorldUsage: "A typical DAG: `S3KeySensor` (waits for file) -> `SnowflakeOperator` (loads data) -> `DbtCloudRunJobOperator` (transforms data) -> `SlackAPIPostOperator` (sends success message).",
  theory: "## Airflow Building Blocks\n\n### Operators (The \"Doers\")\nTemplates for specific tasks.\n- **Action**: Do something (`BashOperator`, `PythonOperator`)\n- **Transfer**: Move data (`S3ToSnowflakeOperator`)\n\n### Sensors (The \"Waiters\")\nA special type of Operator that pokes a system until a condition is met.\n- e.g., `S3KeySensor` checks every 60 seconds if 'data.csv' has arrived. When it does, the sensor succeeds and the DAG continues.\n\n### Hooks (The \"Connectors\")\nLow-level interfaces used by Operators to connect to external systems (managing authentication and connections securely).",
  resources: {
    docs: [], youtube: [], udemy: [], articles: []
  },
  miniProject: null, exercises: ["Browse the Airflow Provider registry and list the Operators needed to orchestrate an AWS to Snowflake pipeline"],
  nextTopics: ["airflow-arch"], previousTopics: ["airflow-dags"],
  commonMistakes: ["Using a Sensor with a long poke interval occupying a worker slot forever (not using `mode='reschedule'`)"],
  interviewQuestions: ["Difference between an Operator and a Sensor?", "What is an Airflow Hook?"],
  flashcards: [
    { front: "Operator vs Sensor?", back: "An Operator performs an action (runs a script, executes SQL). A Sensor waits for a condition to be met (a file lands, a time passes) before allowing downstream tasks to run." },
    { front: "Sensor mode='reschedule' vs 'poke'?", back: "Poke blocks the worker slot while sleeping. Reschedule frees the worker slot between checks, saving resources for long-running sensors." }
  ],
  summary: "Operators do the work. Sensors wait for conditions. Hooks handle the connections. Leverage Airflow's massive provider ecosystem instead of writing custom code."
},
{
  id: "airflow-arch", title: "Airflow Architecture", phase: "orchestration", phaseLabel: "Orchestration",
  description: "Look under the hood of Airflow to understand the Webserver, Scheduler, Metadata DB, and Workers (Celery/Kubernetes).",
  difficulty: "advanced", estimatedHours: 3, importance: "good-to-know", interviewWeight: 3,
  careerLevel: "mid", interviewImportance: 3, productionImportance: 4,
  interviewRecommendation: "Know Concept — useful for debugging and system design",
  prerequisites: ["operators"], learningObjectives: [
    "Identify the core components of Airflow",
    "Understand how the Scheduler parses DAGs and queues tasks",
    "Compare LocalExecutor, CeleryExecutor, and KubernetesExecutor"
  ],
  problemItSolves: "To run thousands of tasks concurrently, Airflow must distribute work across multiple machines. The architecture separates the scheduling logic from the actual task execution.",
  whyItExists: "Airflow was designed to scale horizontally. By decoupling the components via a message broker (like Redis/RabbitMQ), workers can be scaled up or down based on load.",
  realWorldUsage: "Enterprise deployments use the CeleryExecutor or KubernetesExecutor to run tasks across hundreds of worker nodes. Managed services like MWAA (AWS) or Cloud Composer (GCP) handle this architecture for you.",
  theory: "## Airflow Architecture\n\n### Components\n1. **Metadata Database**: (Postgres/MySQL) Stores state of all DAGs, tasks, and connections.\n2. **Webserver**: The UI. Reads from the DB to show DAG status.\n3. **Scheduler**: The brain. Parses DAG files constantly, checks the DB for what needs to run, and sends tasks to the queue.\n4. **Queue / Broker**: (Redis/RabbitMQ) Holds tasks waiting to be executed.\n5. **Workers**: The machines that actually execute the tasks.\n\n### Executors\n- **SequentialExecutor**: Runs 1 task at a time. (Default, uses SQLite, bad for production).\n- **LocalExecutor**: Runs multiple tasks on the same machine.\n- **CeleryExecutor**: Distributes tasks to a cluster of worker machines via Redis/RabbitMQ.\n- **KubernetesExecutor**: Spins up a new Kubernetes pod for every single task (ultimate isolation).",
  resources: {
    docs: [], youtube: [], udemy: [], articles: []
  },
  miniProject: null, exercises: [],
  nextTopics: ["kafka-overview"], previousTopics: ["operators"],
  commonMistakes: ["Putting top-level code (like API calls) outside the `execute` function in a DAG file. The Scheduler parses DAG files every 30 seconds, so top-level API calls will DDOS the API!"],
  interviewQuestions: ["What are the main components of Airflow's architecture?", "Difference between CeleryExecutor and KubernetesExecutor?", "Why shouldn't you put heavy computation at the top level of a DAG file?"],
  flashcards: [
    { front: "Why avoid top-level code in Airflow DAGs?", back: "The Airflow Scheduler parses every DAG file every ~30 seconds to update the UI and schedule tasks. Any code outside a task function runs every 30 seconds, killing scheduler performance." }
  ],
  summary: "Airflow separates scheduling (Scheduler) from execution (Workers) via a Message Broker. Understand the executors to scale Airflow properly."
}
];

existingModules.push(...newModules);
fs.writeFileSync('src/data/modules.json', JSON.stringify(existingModules, null, 2));
console.log(`Phase 9: Added ${newModules.length} modules (Modeling + Transformation + Orchestration)`);
