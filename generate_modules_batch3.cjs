const fs = require('fs');

const existingModules = JSON.parse(fs.readFileSync('src/data/modules.json', 'utf8'));

const newModules = [
// ═══════════════════════════════════════════════════════════════════
// APACHE SPARK
// ═══════════════════════════════════════════════════════════════════
{
  id: "why-spark", title: "Why Apache Spark?", phase: "spark", phaseLabel: "Apache Spark",
  description: "Understand the history of Big Data — from Hadoop MapReduce to Spark, and why Spark became the dominant processing engine.",
  difficulty: "beginner", estimatedHours: 2, importance: "must-know", interviewWeight: 3,
  careerLevel: "foundation", interviewImportance: 3, productionImportance: 3,
  interviewRecommendation: "Know Concept — good for historical context",
  prerequisites: ["driver-executors", "partitions-dist"], learningObjectives: [
    "Understand the limitations of Hadoop MapReduce (Disk I/O)",
    "Explain Spark's in-memory processing model",
    "Identify when to use Spark vs when NOT to use Spark"
  ],
  problemItSolves: "Hadoop MapReduce was revolutionary but incredibly slow because it wrote intermediate data to disk after every step. Spark solved this by keeping intermediate data in memory, making it up to 100x faster.",
  whyItExists: "Created by Matei Zaharia at UC Berkeley in 2009. It was designed to overcome the strict, two-stage (Map and Reduce) paradigm of Hadoop and allow for interactive, fast data analysis.",
  realWorldUsage: "Spark is the de facto standard for batch data processing. It is the engine behind Databricks and Amazon EMR, processing petabytes of data daily at Netflix, Uber, and Airbnb.",
  theory: "## Why Spark?\n\n### The MapReduce Problem\nIn Hadoop MapReduce, a complex job requires chaining multiple Map and Reduce steps. Between EVERY step, the data is written to disk and read back. Disk I/O is very slow.\n\n### The Spark Solution (In-Memory)\nSpark builds a Directed Acyclic Graph (DAG) of the entire computation. It executes the computation and passes intermediate results directly in RAM between steps, only writing to disk when necessary.\n\n### When NOT to use Spark\n- Small data (use Pandas/SQL)\n- Real-time low-latency streaming (use Flink)\n- Highly concurrent transactional queries (use PostgreSQL)",
  resources: {
    docs: [], youtube: [], udemy: [], articles: []
  },
  miniProject: null, exercises: [],
  nextTopics: ["rdd"], previousTopics: ["driver-executors"],
  commonMistakes: ["Using Spark for small datasets (overhead makes it slower than Pandas)"],
  interviewQuestions: ["Why is Spark faster than Hadoop MapReduce?", "When should you NOT use Spark?"],
  flashcards: [
    { front: "Spark vs MapReduce?", back: "MapReduce writes intermediate results to disk after every step. Spark keeps intermediate results in memory, making it 10-100x faster." }
  ],
  summary: "Spark replaced Hadoop MapReduce by doing in-memory processing instead of disk-based processing, making massive data transformations fast and flexible."
},
{
  id: "rdd", title: "RDDs (Resilient Distributed Datasets)", phase: "spark", phaseLabel: "Apache Spark",
  description: "Learn RDDs, the foundational, low-level data structure of Apache Spark. Understand immutability and resilience.",
  difficulty: "intermediate", estimatedHours: 3, importance: "good-to-know", interviewWeight: 2,
  careerLevel: "junior", interviewImportance: 2, productionImportance: 2,
  interviewRecommendation: "Know Concept — mostly legacy, but good for understanding Spark internals",
  prerequisites: ["why-spark"], learningObjectives: [
    "Define an RDD",
    "Understand Immutability and Lineage (Resilience)",
    "Know why DataFrames replaced RDDs"
  ],
  problemItSolves: "How do you represent a collection of objects distributed across 100 machines in a way that tolerates machine failures? RDDs provide an abstraction that feels like a local collection but handles distribution and fault tolerance automatically.",
  whyItExists: "RDDs were the original data structure in Spark 1.0. They are still the engine under the hood, but developers rarely use them directly anymore.",
  realWorldUsage: "Almost never used in modern production code unless writing complex, non-tabular algorithms (like custom machine learning or graph processing).",
  theory: "## RDDs\n\n### Key Concepts\n- **Resilient**: If a node crashes, Spark can rebuild the lost data using the 'Lineage' (the recipe of transformations that created it).\n- **Distributed**: Data is partitioned across machines.\n- **Dataset**: A collection of Java/Python objects.\n- **Immutable**: You cannot change an RDD; you can only transform it into a new RDD.\n\n### Why we don't use them anymore\nRDDs don't have a schema. Spark doesn't know if an RDD contains Integers, Strings, or complex objects. Because of this, Spark cannot optimize the execution plan. DataFrames solve this.",
  resources: {
    docs: [], youtube: [], udemy: [], articles: []
  },
  miniProject: null, exercises: [],
  nextTopics: ["spark-dataframes"], previousTopics: ["why-spark"],
  commonMistakes: ["Writing new code using RDDs instead of DataFrames"],
  interviewQuestions: ["What is an RDD?", "How does Spark achieve fault tolerance (Resilience)?"],
  flashcards: [
    { front: "How do RDDs achieve fault tolerance?", back: "Through Lineage. Instead of replicating data, Spark remembers the sequence of transformations (the DAG) used to build the RDD. If a partition is lost, it simply recomputes it." }
  ],
  summary: "RDDs are the low-level distributed collections in Spark. They are resilient through lineage, but lack schemas, making them hard for the engine to optimize."
},
{
  id: "spark-dataframes", title: "Spark DataFrames & SQL", phase: "spark", phaseLabel: "Apache Spark",
  description: "Master the DataFrame API — the standard way to write Spark code today. Learn the DataFrame abstraction and Spark SQL.",
  difficulty: "intermediate", estimatedHours: 6, importance: "must-know", interviewWeight: 5,
  careerLevel: "junior", interviewImportance: 5, productionImportance: 5,
  interviewRecommendation: "Learn Deeply — you will be asked to write DataFrame code in interviews",
  prerequisites: ["rdd"], learningObjectives: [
    "Write PySpark DataFrame transformations (select, filter, groupBy, join)",
    "Understand the schema and Catalyst Optimizer",
    "Switch seamlessly between DataFrame API and Spark SQL"
  ],
  problemItSolves: "Writing RDD code is tedious and unoptimized. DataFrames bring a table-like abstraction (like Pandas or SQL) with a schema, allowing Spark to heavily optimize the execution.",
  whyItExists: "Introduced in Spark 1.3 to make Spark easier to use and much faster. By enforcing a schema, Spark can optimize queries before running them.",
  realWorldUsage: "99% of modern Spark code is written using the DataFrame API or Spark SQL. Data engineers use it to read Parquet files, join massive datasets, and write results back to the lake.",
  theory: "## Spark DataFrames\n\nA DataFrame is a distributed collection of data organized into named columns. It is conceptually equivalent to a table in a relational database.\n\n### PySpark API vs SQL\nThey compile to the exact same execution plan!\n\n```python\n# DataFrame API\ndf.filter(df.age > 21).groupBy(\"city\").count()\n\n# Spark SQL\ndf.createOrReplaceTempView(\"people\")\nspark.sql(\"SELECT city, count(*) FROM people WHERE age > 21 GROUP BY city\")\n```\n\n### The Catalyst Optimizer\nBecause DataFrames have a schema, Spark analyzes your code and creates an optimized physical plan. If you filter AFTER a join in your code, Catalyst is smart enough to push the filter BEFORE the join in execution.",
  resources: {
    docs: [{ title: "PySpark DataFrame API", url: "https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/dataframe.html" }],
    youtube: [], udemy: [], articles: []
  },
  miniProject: { title: "PySpark ETL Job", description: "Write a PySpark script that reads JSON logs, cleans the data, joins it with a CSV dimension table, aggregates metrics, and writes the output as Parquet.", skills: ["PySpark", "DataFrames", "Joins"], estimatedHours: 3 },
  exercises: ["Translate 5 complex SQL queries into the PySpark DataFrame API"],
  nextTopics: ["transformations-actions"], previousTopics: ["rdd"],
  commonMistakes: ["Using Pandas UDFs unnecessarily instead of built-in Spark functions", "Not understanding that DataFrame methods are lazy"],
  interviewQuestions: ["DataFrames vs RDDs?", "DataFrame API vs Spark SQL - which is faster?", "Write a PySpark snippet to join two tables and find the max value per category."],
  flashcards: [
    { front: "DataFrame vs RDD?", back: "DataFrames have a schema (columns and types). This allows the Catalyst Optimizer to optimize the execution plan, making DataFrames much faster and easier to use than RDDs." },
    { front: "DataFrame API vs Spark SQL speed?", back: "They are exactly the same speed. Both compile down to the same logical and physical plan via the Catalyst Optimizer." }
  ],
  summary: "DataFrames are the standard Spark API. They provide a tabular abstraction with a schema, allowing Spark to automatically optimize your code."
},
{
  id: "transformations-actions", title: "Transformations & Actions", phase: "spark", phaseLabel: "Apache Spark",
  description: "Understand the core execution model of Spark — lazy evaluation, Narrow vs Wide transformations, and Actions.",
  difficulty: "intermediate", estimatedHours: 4, importance: "must-know", interviewWeight: 5,
  careerLevel: "junior", interviewImportance: 5, productionImportance: 5,
  interviewRecommendation: "Learn Deeply — fundamental to understanding how Spark executes",
  prerequisites: ["spark-dataframes"], learningObjectives: [
    "Define Lazy Evaluation",
    "Distinguish between Narrow and Wide transformations",
    "Identify which operations trigger a Shuffle",
    "Understand what an Action is and why it's needed"
  ],
  problemItSolves: "If you have 10 data processing steps, executing each one immediately would result in a lot of wasted memory and intermediate files. Spark waits until the very end, looks at all 10 steps, and optimizes them into a single plan.",
  whyItExists: "Lazy evaluation is the secret to Spark's performance optimization. It allows Spark to build the DAG (Directed Acyclic Graph) before doing any actual work.",
  realWorldUsage: "Understanding this prevents catastrophic memory errors in production. Knowing which transformations are 'Wide' helps engineers minimize shuffles.",
  theory: "## Lazy Evaluation\n\n### Transformations (Lazy)\nOperations that return a new DataFrame. **They do not execute immediately.** Spark just records them in the DAG.\n- **Narrow Transformations**: Data stays on the same partition. Fast. (e.g., `select`, `filter`, `withColumn`)\n- **Wide Transformations**: Data must move across the network. Triggers a **Shuffle**. Slow. (e.g., `groupBy`, `join`, `distinct`, `orderBy`)\n\n### Actions (Eager)\nOperations that return a final result to the driver or write to disk. **They trigger the execution of the entire DAG.**\n- e.g., `show()`, `count()`, `collect()`, `write()`",
  resources: {
    docs: [], youtube: [], udemy: [], articles: []
  },
  miniProject: null, exercises: ["Categorize 20 Spark methods as either Narrow Transformation, Wide Transformation, or Action"],
  nextTopics: ["dag"], previousTopics: ["spark-dataframes"],
  commonMistakes: ["Calling `count()` in a loop, triggering the entire massive DAG to execute multiple times", "Not realizing that a simple `orderBy()` triggers a massive network shuffle"],
  interviewQuestions: ["What is Lazy Evaluation in Spark?", "Narrow vs Wide transformations?", "What triggers a Spark job to actually execute?"],
  flashcards: [
    { front: "What is Lazy Evaluation?", back: "Spark does not execute transformations (like filter or join) immediately. It builds a plan (DAG). The plan is only executed when an Action (like show, write, count) is called." },
    { front: "Narrow vs Wide Transformation?", back: "Narrow: operations where data stays on the same machine (filter, map). Wide: operations that require data to move across the network (groupBy, join), triggering a Shuffle." }
  ],
  summary: "Transformations build the plan (lazy). Actions execute the plan. Wide transformations trigger shuffles (slow), while Narrow transformations do not (fast)."
},
{
  id: "dag", title: "The DAG & Catalyst Optimizer", phase: "spark", phaseLabel: "Apache Spark",
  description: "Look under the hood of Spark to understand how it optimizes and plans your code using the DAG and Catalyst.",
  difficulty: "advanced", estimatedHours: 3, importance: "must-know", interviewWeight: 4,
  careerLevel: "mid", interviewImportance: 4, productionImportance: 4,
  interviewRecommendation: "Learn Well — separates junior from mid-level engineers",
  prerequisites: ["transformations-actions"], learningObjectives: [
    "Understand the Directed Acyclic Graph (DAG)",
    "Explain the stages of the Catalyst Optimizer",
    "Read a Spark execution plan (`explain()`)",
    "Understand Jobs, Stages, and Tasks"
  ],
  problemItSolves: "Users write inefficient code (e.g., joining two billion-row tables and THEN filtering for 'USA'). Catalyst rewrites this to filter first, then join, saving hours of compute time.",
  whyItExists: "Catalyst is the brain of Spark SQL and DataFrames. It allows Spark to perform database-style query optimizations on distributed data.",
  realWorldUsage: "Senior data engineers use `df.explain()` to read the physical plan and figure out why a pipeline is running slowly, identifying missing predicate pushdowns or bad join strategies.",
  theory: "## Under the Hood\n\n### The Catalyst Optimizer\n1. **Unresolved Logical Plan**: Validates column names against the catalog.\n2. **Resolved Logical Plan**: Applies optimizations (e.g., Predicate Pushdown, Constant Folding).\n3. **Physical Plan**: Compares multiple physical execution strategies (e.g., Broadcast Join vs Sort-Merge Join) and picks the cheapest one based on cost models.\n\n### Execution Hierarchy\n- **Application**: The entire Spark program.\n- **Job**: Triggered by an Action (e.g., `write()`).\n- **Stage**: A job is divided into stages by Wide Transformations (shuffles). A shuffle boundary always creates a new stage.\n- **Task**: A stage is divided into tasks. One task = one partition of data processed by one CPU core.",
  resources: {
    docs: [], youtube: [], udemy: [], articles: []
  },
  miniProject: null, exercises: ["Run `explain(True)` on a complex DataFrame and map the logical plan to the physical plan"],
  nextTopics: ["spark-joins"], previousTopics: ["transformations-actions"],
  commonMistakes: ["Ignoring the physical plan when debugging performance issues"],
  interviewQuestions: ["What is the DAG?", "How does the Catalyst Optimizer work?", "Explain the relationship between Jobs, Stages, and Tasks in Spark."],
  flashcards: [
    { front: "What creates a new Stage in Spark?", back: "A Shuffle (Wide Transformation). Data must be written to disk and sent across the network, so Spark ends the current stage and starts a new one." },
    { front: "Job vs Stage vs Task?", back: "Action triggers a Job. Shuffles divide a Job into Stages. Partitions divide a Stage into Tasks (1 task = 1 partition = 1 CPU core)." }
  ],
  summary: "Catalyst optimizes your code into a physical plan. Execution is broken down: Actions trigger Jobs, Shuffles divide Jobs into Stages, Partitions divide Stages into Tasks."
},
{
  id: "spark-joins", title: "Spark Join Strategies", phase: "spark", phaseLabel: "Apache Spark",
  description: "Master how Spark joins data across a cluster. Learn Sort-Merge Join, Broadcast Hash Join, and how to fix OOM errors.",
  difficulty: "advanced", estimatedHours: 4, importance: "must-know", interviewWeight: 5,
  careerLevel: "mid", interviewImportance: 5, productionImportance: 5,
  interviewRecommendation: "Learn Deeply — guaranteed interview question",
  prerequisites: ["dag"], learningObjectives: [
    "Understand the Sort-Merge Join (default)",
    "Master the Broadcast Hash Join (optimization)",
    "Know when to use Shuffle Hash Join",
    "Fix Data Skew in joins (Salting)"
  ],
  problemItSolves: "Joining two massive tables triggers a massive network shuffle. If one table is small, shuffling the large table is a huge waste of time. Broadcast joins solve this.",
  whyItExists: "Distributed joins are the hardest problem in big data. Spark provides different algorithms based on table sizes and sorting to optimize this process.",
  realWorldUsage: "At any company, fixing a slow Spark pipeline usually involves converting a Sort-Merge Join into a Broadcast Join, or handling data skew via salting.",
  theory: "## Join Strategies\n\n### Sort-Merge Join (Default)\nUsed when both tables are large.\n1. **Shuffle**: Both tables are partitioned by the join key.\n2. **Sort**: Each partition is sorted by the join key.\n3. **Merge**: The sorted partitions are merged together. (Very expensive but safe).\n\n### Broadcast Hash Join\nUsed when one table is small (< 10MB default).\n1. The small table is sent to the Driver.\n2. The Driver **broadcasts** a full copy of the small table to EVERY Executor.\n3. The large table is NOT shuffled. Executors join their large partitions with the local copy of the small table.\n*(Massive performance boost, but OOMs the driver if the broadcasted table is too large).* \n\n### Data Skew & Salting\nIf joining on a skewed key (e.g., `country='USA'`), one executor gets overloaded and crashes. Fix this by **Salting**: appending a random number (1-10) to the 'USA' key in both tables, forcing the data to distribute across 10 executors.",
  resources: {
    docs: [], youtube: [], udemy: [], articles: []
  },
  miniProject: null, exercises: ["Force a Broadcast join using the `broadcast()` hint in PySpark", "Implement a salting technique to fix a skewed join"],
  nextTopics: ["spark-caching"], previousTopics: ["dag"],
  commonMistakes: ["Trying to broadcast a 5GB table, crashing the Driver", "Not checking for data skew when a job hangs at 99%"],
  interviewQuestions: ["What is a Broadcast Join and when should you use it?", "How does a Sort-Merge Join work?", "Your Spark job is stuck at 99%. What is the likely cause and how do you fix it?"],
  flashcards: [
    { front: "What is a Broadcast Join?", back: "When joining a large table and a small table, Spark sends a full copy of the small table to every executor. This completely eliminates the need to shuffle the large table." },
    { front: "Spark job stuck at 99%?", back: "Classic symptom of Data Skew. One partition has massively more data than the others, so one task takes hours while the others finished in seconds. Fix by salting the join key." }
  ],
  summary: "Sort-Merge is the default join for large tables (shuffles both). Broadcast Join copies a small table to all executors (eliminates shuffles). Data skew ruins joins and requires salting."
},
{
  id: "spark-caching", title: "Caching & Persistence", phase: "spark", phaseLabel: "Apache Spark",
  description: "Learn how to control Spark's memory. Understand cache(), persist(), and Storage Levels.",
  difficulty: "intermediate", estimatedHours: 2, importance: "must-know", interviewWeight: 3,
  careerLevel: "junior", interviewImportance: 3, productionImportance: 4,
  interviewRecommendation: "Learn Enough — know when to cache and when NOT to",
  prerequisites: ["transformations-actions"], learningObjectives: [
    "Understand when to use caching (iterative algorithms, repeated DAGs)",
    "Differentiate `cache()` vs `persist()`",
    "Understand storage levels (MEMORY_ONLY, MEMORY_AND_DISK)"
  ],
  problemItSolves: "If you read a 1TB file, filter it, and then run 5 different aggregations on it, Spark will normally read the 1TB file 5 separate times from disk! Caching saves the filtered data in RAM so subsequent actions are instant.",
  whyItExists: "This is the core feature that made Spark famous — the ability to hold intermediate datasets in memory for interactive querying or iterative machine learning algorithms.",
  realWorldUsage: "Used heavily when exploring data in Databricks notebooks. Less common in production ETL pipelines unless a specific DataFrame is reused multiple times across different branches of the code.",
  theory: "## Caching\n\n### The Problem\nBecause of lazy evaluation, every time you call an Action, Spark recomputes the entire DAG from the source file. \n\n### The Solution\n```python\ndf = spark.read.parquet(\"...\").filter(\"age > 21\")\ndf.cache() # Marks it for caching\ndf.count() # Action 1: Reads from disk, filters, CACHES in memory, then counts\ndf.show()  # Action 2: Reads directly from MEMORY (instant!)\n```\n\n### cache() vs persist()\n- `cache()` is a shortcut for `persist(MEMORY_AND_DISK)`. \n- `persist()` allows you to choose the storage level (e.g., `MEMORY_ONLY`, `DISK_ONLY`, or serialized versions to save space).",
  resources: {
    docs: [], youtube: [], udemy: [], articles: []
  },
  miniProject: null, exercises: ["Write a script that proves caching saves time on multiple actions using time.time()"],
  nextTopics: ["spark-tuning"], previousTopics: ["spark-joins"],
  commonMistakes: ["Caching everything! Caching has serialization and memory overhead. Only cache if you use the DataFrame MORE THAN ONCE.", "Forgetting to `unpersist()` large dataframes when done"],
  interviewQuestions: ["When should you use cache() in Spark?", "Difference between cache() and persist()?", "What happens if the cache doesn't fit in memory?"],
  flashcards: [
    { front: "When should you cache a DataFrame?", back: "ONLY when you are going to call an Action on that exact same DataFrame multiple times (e.g., branching logic or iterative ML algorithms). Do not cache for a simple linear ETL pipeline." }
  ],
  summary: "Caching holds intermediate data in memory across multiple Actions, preventing recomputation of the DAG. Only use it when a DataFrame is reused."
},
{
  id: "spark-tuning", title: "Spark Performance Tuning", phase: "spark", phaseLabel: "Apache Spark",
  description: "Advanced techniques for making Spark pipelines fast and reliable — memory management, partitioning, and AQE.",
  difficulty: "advanced", estimatedHours: 4, importance: "must-know", interviewWeight: 4,
  careerLevel: "senior", interviewImportance: 4, productionImportance: 5,
  interviewRecommendation: "Learn Deeply — the most important skill for a Senior Data Engineer",
  prerequisites: ["spark-joins", "spark-caching"], learningObjectives: [
    "Manage the number of partitions (`repartition` vs `coalesce`)",
    "Understand Adaptive Query Execution (AQE)",
    "Diagnose and fix OutOfMemory (OOM) errors",
    "Read the Spark UI"
  ],
  problemItSolves: "Out of the box, Spark works fine for small data. But at terabyte scale, default configurations lead to OutOfMemory errors, massive GC pauses, and failed jobs. Tuning fixes this.",
  whyItExists: "Distributed systems are complex. The optimal number of partitions and memory allocation depends entirely on the specific data and query, requiring manual or dynamic tuning.",
  realWorldUsage: "Senior engineers spend significant time tuning heavy production jobs to reduce cloud costs and meet SLAs.",
  theory: "## Performance Tuning\n\n### Partitions\n- **Too few partitions**: Data skew, OutOfMemory errors (too much data per core).\n- **Too many partitions**: Task scheduling overhead, small file problem on disk.\n- **Rule of Thumb**: Aim for ~128MB per partition, or 2-3x the number of CPU cores in the cluster.\n- **coalesce()**: Reduces partitions without a full shuffle. Fast.\n- **repartition()**: Increases or decreases partitions with a full network shuffle. Evenly distributes data.\n\n### Adaptive Query Execution (AQE)\nIntroduced in Spark 3.0. It optimizes the physical plan *during* execution based on actual data sizes after shuffles. It can:\n1. Dynamically coalesce shuffle partitions (fixes 'too many partitions').\n2. Dynamically switch Sort-Merge Join to Broadcast Join if post-filter data is small.\n3. Dynamically optimize skew joins.",
  resources: {
    docs: [], youtube: [], udemy: [], articles: []
  },
  miniProject: null, exercises: [],
  nextTopics: ["db-workspace"], previousTopics: ["spark-caching"],
  commonMistakes: ["Using repartition(1) to write a single file (forces all data to 1 machine, OOMs)", "Allocating huge executor memory instead of fixing data skew"],
  interviewQuestions: ["Difference between coalesce() and repartition()?", "What is Adaptive Query Execution (AQE)?", "How do you fix an OutOfMemoryError in an executor?"],
  flashcards: [
    { front: "coalesce vs repartition?", back: "coalesce reduces partitions and avoids a full shuffle (fast, but can leave uneven partitions). repartition does a full network shuffle to evenly distribute data into any number of partitions (slow but balanced)." },
    { front: "What does AQE do?", back: "Adaptive Query Execution optimizes the physical plan dynamically during runtime. It coalesces shuffle partitions, switches to broadcast joins if data is small, and handles data skew automatically." }
  ],
  summary: "Tuning involves managing partitions (repartition vs coalesce), fixing data skew, and leveraging AQE to optimize execution dynamically."
},

// ═══════════════════════════════════════════════════════════════════
// DATABRICKS
// ═══════════════════════════════════════════════════════════════════
{
  id: "db-workspace", title: "Databricks Overview", phase: "databricks", phaseLabel: "Databricks",
  description: "Understand the Databricks platform — the unified analytics platform built around Apache Spark.",
  difficulty: "beginner", estimatedHours: 2, importance: "good-to-know", interviewWeight: 2,
  careerLevel: "foundation", interviewImportance: 2, productionImportance: 4,
  interviewRecommendation: "Know Concept — many companies use Databricks, good to know the ecosystem",
  prerequisites: ["why-spark", "lakehouse-arch"], learningObjectives: [
    "Understand the value proposition of Databricks",
    "Navigate the Workspace, Repos, and Compute architecture",
    "Understand the separation of Control Plane and Data Plane"
  ],
  problemItSolves: "Managing open-source Spark on raw EC2 instances is an infrastructure nightmare. Databricks provides a fully managed, optimized Spark environment with collaborative notebooks and scheduling.",
  whyItExists: "Founded by the original creators of Apache Spark. They monetized Spark by offering the best cloud-native platform for it, eventually pioneering the Lakehouse architecture.",
  realWorldUsage: "Over 10,000 companies (AT&T, Condé Nast, Shell) use Databricks as their primary data engineering and data science platform.",
  theory: "## Databricks Platform\n\n### Architecture\n- **Control Plane**: Hosted by Databricks (UI, Notebooks, Job Scheduler, Cluster Manager).\n- **Data Plane**: Hosted in YOUR cloud account (VPC/VNet). This is where the actual EC2 instances (clusters) run and process data. Databricks never holds your data.\n\n### Key Components\n- **Workspace/Repos**: Collaborative notebooks synced with Git.\n- **Compute**: Managed Spark clusters (All-Purpose for interactive, Job for automated).\n- **Workflows**: Built-in orchestrator (like Airflow).\n- **Unity Catalog**: Unified governance and security.",
  resources: {
    docs: [{ title: "Databricks Architecture", url: "https://docs.databricks.com/getting-started/overview.html" }],
    youtube: [], udemy: [], articles: []
  },
  miniProject: null, exercises: [],
  nextTopics: ["dlt"], previousTopics: ["spark-tuning"],
  commonMistakes: ["Thinking Databricks stores your data (it lives in your AWS S3 / Azure ADLS)"],
  interviewQuestions: ["What is the difference between open-source Spark and Databricks?", "Explain Databricks Control Plane vs Data Plane."],
  flashcards: [
    { front: "Control Plane vs Data Plane?", back: "Control Plane is managed by Databricks (UI, Notebooks, Scheduler). Data Plane lives in the customer's cloud account (the actual compute clusters and data storage)." }
  ],
  summary: "Databricks is a managed Lakehouse platform providing optimized Spark compute, collaborative notebooks, orchestration, and governance (Unity Catalog)."
},
{
  id: "dlt", title: "Delta Live Tables (DLT)", phase: "databricks", phaseLabel: "Databricks",
  description: "Learn DLT — Databricks' declarative framework for building reliable data pipelines.",
  difficulty: "intermediate", estimatedHours: 3, importance: "good-to-know", interviewWeight: 2,
  careerLevel: "mid", interviewImportance: 2, productionImportance: 3,
  interviewRecommendation: "Know Concept — highly specific to Databricks roles",
  prerequisites: ["db-workspace", "medallion"], learningObjectives: [
    "Understand declarative pipeline definition",
    "Know how DLT handles dependencies automatically",
    "Use Expectations for data quality"
  ],
  problemItSolves: "Writing production Spark structured streaming jobs requires handling checkpoints, state, and complex error handling manually. DLT abstracts this away — you just write SQL/Python and it handles the execution.",
  whyItExists: "Databricks created DLT to make building Medallion architecture pipelines as easy as using dbt, but with native support for both batch and streaming.",
  realWorldUsage: "Databricks customers use DLT to implement Bronze/Silver/Gold pipelines without writing boilerplate checkpointing and retry logic.",
  theory: "## Delta Live Tables\n\n### Declarative Pipelines\nInstead of writing `df.write.format('delta').save()`, you define what the table should look like:\n```python\n@dlt.table\ndef silver_users():\n    return dlt.read(\"bronze_users\").filter(\"age > 0\")\n```\nDLT automatically figures out the DAG dependencies.\n\n### Expectations (Data Quality)\nDLT integrates data quality directly into the pipeline:\n```python\n@dlt.expect_or_drop(\"valid_age\", \"age > 0\")\n@dlt.table\ndef valid_users():\n    return dlt.read(\"raw_users\")\n```\nOptions: `expect` (log), `expect_or_drop` (filter), `expect_or_fail` (stop pipeline).",
  resources: {
    docs: [{ title: "DLT Documentation", url: "https://docs.databricks.com/data-engineering/delta-live-tables/index.html" }],
    youtube: [], udemy: [], articles: []
  },
  miniProject: null, exercises: [],
  nextTopics: ["unity-catalog"], previousTopics: ["db-workspace"],
  commonMistakes: ["Using DLT for simple scheduled tasks (Workflows is cheaper and better for that)"],
  interviewQuestions: ["What is Delta Live Tables?", "How does DLT handle data quality?"],
  flashcards: [
    { front: "What is Delta Live Tables (DLT)?", back: "A declarative framework in Databricks for building reliable batch and streaming pipelines. It automatically handles task dependencies, checkpointing, and data quality expectations." }
  ],
  summary: "DLT is a declarative framework for building Medallion pipelines in Databricks, with built-in data quality expectations and automatic dependency management."
},
{
  id: "unity-catalog", title: "Unity Catalog", phase: "databricks", phaseLabel: "Databricks",
  description: "Understand Unity Catalog — the unified governance solution for data and AI on the Databricks Lakehouse.",
  difficulty: "intermediate", estimatedHours: 2, importance: "good-to-know", interviewWeight: 2,
  careerLevel: "senior", interviewImportance: 2, productionImportance: 4,
  interviewRecommendation: "Know Concept — crucial if interviewing at a Databricks shop",
  prerequisites: ["db-workspace", "data-governance"], learningObjectives: [
    "Understand the 3-level namespace (Catalog.Schema.Table)",
    "Explain fine-grained access control (GRANT/REVOKE)",
    "Understand automated data lineage"
  ],
  problemItSolves: "Historically, data lakes had awful security (IAM roles at the bucket level). Unity Catalog brings standard SQL security (`GRANT SELECT ON TABLE`) to the data lake.",
  whyItExists: "To make the Lakehouse truly replace the Data Warehouse, it needed enterprise-grade governance. Unity Catalog provides a centralized metastore across all Databricks workspaces.",
  realWorldUsage: "Used by admins to grant row-level and column-level security to specific groups, ensuring data scientists can't see PII data.",
  theory: "## Unity Catalog\n\n### Three-Level Namespace\n`catalog_name.schema_name.table_name`\n- **Catalog**: Top-level container (e.g., `prod`, `dev`)\n- **Schema**: Group of tables (e.g., `sales`, `hr`)\n- **Table**: The actual data (Delta tables)\n\n### Governance Features\n- **Access Control**: Standard ANSI SQL `GRANT` statements.\n- **Data Lineage**: Automatically tracks which tables/notebooks generated which other tables, down to the column level.\n- **External Locations**: Securely mounts S3/ADLS buckets.",
  resources: {
    docs: [{ title: "Unity Catalog", url: "https://docs.databricks.com/data-governance/unity-catalog/index.html" }],
    youtube: [], udemy: [], articles: []
  },
  miniProject: null, exercises: [],
  nextTopics: ["er-model"], previousTopics: ["dlt"],
  commonMistakes: ["Confusing the old Hive Metastore with Unity Catalog"],
  interviewQuestions: ["What is Unity Catalog?", "Explain the 3-level namespace in Unity Catalog."],
  flashcards: [
    { front: "What is Unity Catalog?", back: "Databricks' unified governance solution. It provides centralized access control (GRANT/REVOKE), auditing, and automated data lineage across all workspaces." }
  ],
  summary: "Unity Catalog brings enterprise-grade governance, data lineage, and fine-grained access control to the Databricks Lakehouse."
}
];

existingModules.push(...newModules);
fs.writeFileSync('src/data/modules.json', JSON.stringify(existingModules, null, 2));
console.log(`Phase 8: Added ${newModules.length} modules (Spark + Databricks)`);
