const fs = require('fs');

const existingModules = JSON.parse(fs.readFileSync('src/data/modules.json', 'utf8'));

const newModules = [
// ═══════════════════════════════════════════════════════════════════
// STORAGE & FORMATS
// ═══════════════════════════════════════════════════════════════════
{
  id: "csv-json", title: "CSV & JSON", phase: "storage", phaseLabel: "Storage & Formats",
  description: "Understand basic text-based data formats, their limitations for big data, and when to still use them.",
  difficulty: "beginner", estimatedHours: 2, importance: "must-know", interviewWeight: 2,
  careerLevel: "foundation", interviewImportance: 2, productionImportance: 3,
  interviewRecommendation: "Know Concept — understand why they are inefficient for analytics",
  prerequisites: ["python"], learningObjectives: [
    "Understand the structure of CSV and JSON",
    "Identify the limitations of text formats (no schema, no compression, row-based)",
    "Know when to use CSV/JSON vs columnar formats"
  ],
  problemItSolves: "CSV and JSON are human-readable and universally supported. They are excellent for data exchange between APIs or lightweight scripts.",
  whyItExists: "Before big data systems, CSV was the standard for tabular data and JSON for nested data. They remain the 'lowest common denominator' formats.",
  realWorldUsage: "Most third-party APIs return JSON. Many legacy systems export CSV. Data engineers often ingest these formats and immediately convert them to Parquet.",
  theory: "## CSV & JSON\n\n### CSV (Comma-Separated Values)\n- **Structure**: Row-based, delimited text\n- **Pros**: Universally supported, human-readable\n- **Cons**: No schema, no types (everything is text), no nested data, no built-in compression\n\n### JSON (JavaScript Object Notation)\n- **Structure**: Key-value pairs, nested\n- **Pros**: Supports nested/hierarchical data, universally supported in APIs\n- **Cons**: Very verbose (keys repeated every row), slow to parse, row-based\n\n### Why Not for Big Data?\nTo find the sum of salaries in a 1TB JSON file, the system must read and parse the entire 1TB file, including all other fields.",
  resources: {
    docs: [], youtube: [], udemy: [], articles: []
  },
  miniProject: null, exercises: ["Write a script to convert a 1GB CSV to JSON line-delimited format"],
  nextTopics: ["parquet", "avro"], previousTopics: [],
  commonMistakes: ["Using CSV for large datasets", "Not handling escaped commas in CSVs", "Using standard JSON instead of JSONL for large files"],
  interviewQuestions: ["Why are CSV and JSON bad for analytics?", "What is JSONL?"],
  flashcards: [
    { front: "JSON vs JSONL?", back: "JSON requires reading the whole file to parse a valid array. JSONL (JSON Lines) puts one JSON object per line, allowing stream processing without loading the whole file into memory." }
  ],
  summary: "CSV and JSON are great for APIs and simple data exchange but terrible for big data analytics due to being row-based, uncompressed, and lacking schema enforcement."
},
{
  id: "parquet", title: "Apache Parquet", phase: "storage", phaseLabel: "Storage & Formats",
  description: "Deep dive into Parquet — the de facto standard columnar format for big data analytics. Learn about row groups, compression, and predicate pushdown.",
  difficulty: "intermediate", estimatedHours: 4, importance: "must-know", interviewWeight: 4,
  careerLevel: "junior", interviewImportance: 4, productionImportance: 5,
  interviewRecommendation: "Learn Well — very common interview topic",
  prerequisites: ["csv-json", "oltp-vs-olap"], learningObjectives: [
    "Understand columnar storage internals",
    "Explain row groups, column chunks, and pages",
    "Understand predicate pushdown / filter pushdown",
    "Know how Parquet integrates with Spark and query engines"
  ],
  problemItSolves: "Reading a 1TB CSV file to sum a single column is too slow and expensive. Parquet solves this by storing data in columns, allowing query engines to skip unneeded columns entirely.",
  whyItExists: "Created by Twitter and Cloudera, Parquet was designed to bring efficient columnar storage to the Hadoop ecosystem. It dramatically reduces storage costs and query times.",
  realWorldUsage: "At almost every modern data company, the data lake is built on Parquet files. Spark writes Parquet by default, and Athena/BigQuery query Parquet files directly from S3/GCS.",
  theory: "## Apache Parquet\n\n### Columnar Storage\nInstead of storing `(row1_col1, row1_col2), (row2_col1, row2_col2)`... Parquet stores `(row1_col1, row2_col1), (row1_col2, row2_col2)`. If you query `SELECT SUM(col1)`, the engine only reads the `col1` chunk.\n\n### Internal Structure\n1. **Row Group**: A logical horizontal partitioning of data (e.g., 10,000 rows)\n2. **Column Chunk**: The data for one column within a Row Group\n3. **Page**: The smallest unit of data, containing encoded values and statistics (min/max)\n\n### Predicate Pushdown\nBecause Parquet stores min/max statistics for each page, a query like `WHERE age > 50` can entirely skip reading pages where the `max_age` is 40. This is called predicate pushdown.",
  resources: {
    docs: [{ title: "Apache Parquet Docs", url: "https://parquet.apache.org/" }],
    youtube: [{ title: "Parquet Explained", url: "https://www.youtube.com/watch?v=1b-iE_iS7fA", duration: "15m" }],
    udemy: [], articles: []
  },
  miniProject: null, exercises: ["Compare the file size of a 1M row CSV vs the same data in Parquet"],
  nextTopics: ["avro", "compression"], previousTopics: ["csv-json"],
  commonMistakes: ["Creating too many small Parquet files (small file problem)", "Sorting data incorrectly before writing Parquet"],
  interviewQuestions: ["How does Parquet differ from CSV?", "What is predicate pushdown?", "Describe the internal structure of a Parquet file."],
  flashcards: [
    { front: "What is predicate pushdown?", back: "An optimization where the query engine pushes filters (predicates) down to the storage layer. Parquet uses min/max stats to skip reading irrelevant data pages entirely." },
    { front: "Parquet internal structure?", back: "File -> Row Groups -> Column Chunks -> Pages. Pages contain the actual encoded data and min/max statistics." }
  ],
  summary: "Parquet is a columnar format optimized for analytics. It saves storage via compression and speeds up queries via columnar reads and predicate pushdown."
},
{
  id: "avro", title: "Apache Avro", phase: "storage", phaseLabel: "Storage & Formats",
  description: "Learn Avro — a row-based format with strong schema evolution, perfect for streaming pipelines and Kafka.",
  difficulty: "intermediate", estimatedHours: 3, importance: "must-know", interviewWeight: 3,
  careerLevel: "junior", interviewImportance: 3, productionImportance: 4,
  interviewRecommendation: "Learn Enough — know when to choose Avro vs Parquet",
  prerequisites: ["csv-json"], learningObjectives: [
    "Understand Avro's row-based, binary format",
    "Explain how Avro handles schema evolution",
    "Compare Avro (write-optimized) vs Parquet (read-optimized)",
    "Understand Avro's synergy with Kafka and Schema Registry"
  ],
  problemItSolves: "In streaming systems, schemas change over time. If a producer adds a column, consumers might break. Avro embeds the schema with the data and provides rules for safe schema evolution.",
  whyItExists: "Created by Doug Cutting (Hadoop founder), Avro was designed for data serialization and RPC. It became the standard format for Kafka because of its fast writes and robust schema evolution.",
  realWorldUsage: "At LinkedIn and Uber, thousands of Kafka topics use Avro. The schema is stored in a Schema Registry, ensuring producers and consumers always agree on the data structure.",
  theory: "## Apache Avro\n\n### Key Features\n- **Row-based**: Optimized for fast writes and reading entire records\n- **Binary**: Compact and fast to serialize/deserialize\n- **Schema embedded**: The JSON schema travels with the data (or in a registry)\n\n### Schema Evolution\nAvro allows adding, deleting, or modifying fields without breaking consumers, provided you follow compatibility rules (e.g., adding a field with a default value is safe).\n\n### Avro vs Parquet\n- **Avro**: Row-based, write-optimized, excellent schema evolution. Best for: Kafka, streaming, raw data ingestion.\n- **Parquet**: Column-based, read-optimized. Best for: Data lakes, analytics, data warehouses.",
  resources: {
    docs: [{ title: "Apache Avro Docs", url: "https://avro.apache.org/docs/current/" }],
    youtube: [], udemy: [], articles: []
  },
  miniProject: null, exercises: ["Define an Avro schema for a user event and evolve it safely by adding a field"],
  nextTopics: ["compression", "kafka-overview"], previousTopics: ["csv-json"],
  commonMistakes: ["Using Avro for analytical queries in a data lake", "Breaking schema compatibility rules when evolving schemas"],
  interviewQuestions: ["Avro vs Parquet?", "How does Avro handle schema evolution?", "Why is Avro popular with Kafka?"],
  flashcards: [
    { front: "Avro vs Parquet?", back: "Avro is row-based, write-optimized, and excels at schema evolution (great for streaming/Kafka). Parquet is column-based and read-optimized (great for analytics/data lakes)." }
  ],
  summary: "Avro is a row-based, binary format with robust schema evolution. It is the preferred format for streaming data pipelines and Kafka."
},
{
  id: "compression", title: "Compression & Encoding", phase: "storage", phaseLabel: "Storage & Formats",
  description: "Understand compression algorithms (Snappy, GZIP, ZSTD) and encodings (Dictionary, Run-Length) used in big data systems.",
  difficulty: "intermediate", estimatedHours: 2, importance: "good-to-know", interviewWeight: 2,
  careerLevel: "mid", interviewImportance: 2, productionImportance: 3,
  interviewRecommendation: "Know Concept — helpful for optimization questions",
  prerequisites: ["parquet"], learningObjectives: [
    "Compare Snappy, GZIP, and ZSTD algorithms",
    "Understand the tradeoff between compression ratio and CPU usage",
    "Explain Dictionary encoding and Run-Length Encoding (RLE)"
  ],
  problemItSolves: "Storage is cheap, but I/O (reading from disk/network) is slow. Compressing data reduces I/O time, which often speeds up queries even accounting for CPU decompression time.",
  whyItExists: "Big data formats like Parquet rely heavily on encodings and compression to achieve massive size reductions. Choosing the right algorithm balances CPU usage and disk I/O.",
  realWorldUsage: "Most organizations now use Snappy (fast, decent compression) or ZSTD (great compression, fast) for their Parquet files. GZIP is highly compressed but too slow for most analytics.",
  theory: "## Compression & Encoding\n\n### Compression Algorithms\n- **GZIP**: High compression, high CPU cost, slow. Not splittable.\n- **Snappy**: Low compression, very low CPU cost, very fast. (Default in Parquet for years)\n- **ZSTD (Zstandard)**: Developed by Facebook. High compression, low CPU cost, fast. (The modern standard)\n\n### Encoding (Before Compression)\n- **Dictionary Encoding**: Instead of storing 'New York' 10,000 times, store 'New York'=1 in a dictionary, and store '1' 10,000 times. Excellent for low-cardinality columns.\n- **Run-Length Encoding (RLE)**: Instead of storing '1, 1, 1, 1, 1', store '5x 1'. Excellent for sorted columns with many repeats.",
  resources: {
    docs: [], youtube: [], udemy: [], articles: []
  },
  miniProject: null, exercises: [],
  nextTopics: ["partitions-dist", "delta-format"], previousTopics: ["parquet"],
  commonMistakes: ["Using GZIP on massive files without realizing it's not splittable in Hadoop", "Not sorting data before writing (which ruins RLE encoding benefits)"],
  interviewQuestions: ["What is dictionary encoding?", "Why use Snappy instead of GZIP?", "What is a splittable compression format?"],
  flashcards: [
    { front: "Dictionary Encoding?", back: "Replaces large repeated values with small integers, keeping a mapping dictionary. Massively reduces size for low-cardinality columns." },
    { front: "Snappy vs ZSTD vs GZIP?", back: "Snappy: Fast, low compression. GZIP: Slow, high compression. ZSTD: Fast, high compression (modern standard)." }
  ],
  summary: "Compression reduces I/O at the cost of CPU. ZSTD and Snappy are preferred. Encoding (Dictionary, RLE) happens before compression and is highly effective on sorted, low-cardinality data."
},
{
  id: "delta-format", title: "Delta Lake Format", phase: "storage", phaseLabel: "Storage & Formats",
  description: "Deep dive into the Delta Lake format — how it adds transaction logs to Parquet to enable ACID properties.",
  difficulty: "advanced", estimatedHours: 4, importance: "must-know", interviewWeight: 4,
  careerLevel: "mid", interviewImportance: 4, productionImportance: 5,
  interviewRecommendation: "Learn Well — crucial for Databricks/Lakehouse roles",
  prerequisites: ["parquet", "lakehouse-arch"], learningObjectives: [
    "Understand the Delta transaction log (_delta_log)",
    "Explain how Delta handles updates and deletes (MERGE)",
    "Know maintenance operations: OPTIMIZE and VACUUM",
    "Understand time travel"
  ],
  problemItSolves: "You can't update or delete a row in a Parquet file without rewriting the whole file. Delta Lake tracks which Parquet files are active, allowing safe updates, deletes, and concurrent writes.",
  whyItExists: "Created by Databricks, Delta Lake was the first format to solve the 'Data Lake reliability problem' by bringing ACID transactions to S3/GCS.",
  realWorldUsage: "At Databricks customers, streaming jobs constantly append data while batch jobs run MERGE statements to update records. The transaction log ensures neither job corrupts the data.",
  theory: "## Delta Lake Internals\n\n### The Transaction Log\nDelta is just Parquet files + a `_delta_log` directory. The log contains JSON files recording every change:\n- `add(file1.parquet)`\n- `remove(file2.parquet)`\nWhen reading a Delta table, the engine reads the log first to know which Parquet files are currently valid.\n\n### Maintenance\n- **OPTIMIZE**: Compacts many small files into fewer large files (solves the small file problem).\n- **Z-ORDER**: Co-locates related information in the same set of files, massively improving query speed.\n- **VACUUM**: Deletes old Parquet files that are no longer referenced in the active transaction log.",
  resources: {
    docs: [{ title: "Delta Lake Docs", url: "https://docs.delta.io/latest/index.html" }],
    youtube: [], udemy: [], articles: []
  },
  miniProject: null, exercises: [],
  nextTopics: ["iceberg", "hudi"], previousTopics: ["parquet", "lakehouse-arch"],
  commonMistakes: ["Forgetting to run VACUUM, leading to massive storage costs", "Over-partitioning Delta tables", "Running OPTIMIZE too frequently"],
  interviewQuestions: ["How does Delta Lake implement ACID transactions?", "What do OPTIMIZE and VACUUM do?", "How does time travel work in Delta Lake?"],
  flashcards: [
    { front: "How does Delta Lake work internally?", back: "It consists of standard Parquet files and a _delta_log directory. The log records atomic changes (add/remove file), determining which files make up the current state of the table." },
    { front: "OPTIMIZE vs VACUUM?", back: "OPTIMIZE compacts small files into larger ones for better read performance. VACUUM deletes old data files no longer referenced by the transaction log to save storage cost." }
  ],
  summary: "Delta Lake adds a transaction log to Parquet, enabling ACID transactions, updates/deletes, and time travel. Managing it requires OPTIMIZE and VACUUM."
},
{
  id: "iceberg", title: "Apache Iceberg", phase: "storage", phaseLabel: "Storage & Formats",
  description: "Learn Apache Iceberg — the open standard for huge analytic tables, championed by Netflix and Snowflake.",
  difficulty: "advanced", estimatedHours: 3, importance: "must-know", interviewWeight: 3,
  careerLevel: "senior", interviewImportance: 3, productionImportance: 4,
  interviewRecommendation: "Learn Enough — increasingly popular alternative to Delta",
  prerequisites: ["parquet", "lakehouse-arch"], learningObjectives: [
    "Understand Iceberg's metadata tree structure (metadata, manifests, data files)",
    "Explain hidden partitioning",
    "Compare Iceberg's design to Delta Lake"
  ],
  problemItSolves: "Hive partitioning requires users to know the physical partition layout (e.g., querying `year=2023 AND month=10` instead of just `date > '2023-10-01'`). Iceberg fixes this and handles metadata at a massive scale better than Hive.",
  whyItExists: "Netflix created Iceberg because Hive couldn't handle the metadata for their petabyte-scale tables. It was designed from the ground up to be engine-agnostic and scalable.",
  realWorldUsage: "Snowflake, Apple, and Netflix use Iceberg. It is becoming the universal 'glue' format that allows Snowflake, Spark, Athena, and Trino to all safely query the exact same data lake.",
  theory: "## Apache Iceberg\n\n### Metadata Structure\nUnlike Delta's linear transaction log, Iceberg uses a tree structure:\n1. **Metadata file**: Points to the current Snapshot\n2. **Manifest List**: A Snapshot points to Manifest Lists\n3. **Manifest file**: Points to the actual data files (Parquet) and stores their min/max stats\n\n### Hidden Partitioning\nIn Hive/Delta, if you partition by month, the user MUST include the month in their query. In Iceberg, you partition by `month(event_date)`. The user just queries `event_date`, and Iceberg automatically translates it to the correct partitions.",
  resources: {
    docs: [{ title: "Apache Iceberg Docs", url: "https://iceberg.apache.org/" }],
    youtube: [], udemy: [], articles: []
  },
  miniProject: null, exercises: [],
  nextTopics: ["hudi"], previousTopics: ["delta-format"],
  commonMistakes: ["Thinking users need to query partition columns explicitly"],
  interviewQuestions: ["What is hidden partitioning in Iceberg?", "How does Iceberg's metadata differ from Delta Lake's?"],
  flashcards: [
    { front: "What is Hidden Partitioning?", back: "An Iceberg feature where partition logic (e.g., month from timestamp) is handled by the format, not the user. Users query the timestamp, and Iceberg automatically prunes partitions." }
  ],
  summary: "Iceberg is an open table format focusing on massive metadata scalability, engine-agnostic design, and hidden partitioning."
},
{
  id: "hudi", title: "Apache Hudi", phase: "storage", phaseLabel: "Storage & Formats",
  description: "Learn Apache Hudi — the table format optimized for fast upserts, change data capture, and streaming.",
  difficulty: "advanced", estimatedHours: 2, importance: "good-to-know", interviewWeight: 2,
  careerLevel: "senior", interviewImportance: 2, productionImportance: 3,
  interviewRecommendation: "Know Concept — know when it's the right choice over Delta/Iceberg",
  prerequisites: ["parquet", "lakehouse-arch"], learningObjectives: [
    "Understand Copy-On-Write vs Merge-On-Read storage types",
    "Explain incremental queries",
    "Know when to choose Hudi over Delta/Iceberg"
  ],
  problemItSolves: "Updating records in a data lake is expensive. Uber created Hudi to efficiently handle massive streams of updates (like rider locations or trip status changes) into their data lake.",
  whyItExists: "Created by Uber, Hadoop Upserts Deletes and Incrementals (Hudi) was the first system to enable streaming upserts to Hadoop.",
  realWorldUsage: "Uber, Walmart, and Amazon use Hudi for real-time data lakes where data is constantly changing.",
  theory: "## Apache Hudi\n\n### Storage Types\n1. **Copy-on-Write (CoW)**: Every update rewrites the entire Parquet file. Good for read-heavy, slow-changing data.\n2. **Merge-on-Read (MoR)**: Updates are written to fast Avro log files. Readers merge the Parquet base file with the Avro log on the fly. Good for write-heavy, fast-changing data.\n\n### Incremental Queries\nHudi allows querying only the data that changed since a specific commit, making it perfect for building incremental ETL pipelines.",
  resources: {
    docs: [{ title: "Apache Hudi Docs", url: "https://hudi.apache.org/" }],
    youtube: [], udemy: [], articles: []
  },
  miniProject: null, exercises: [],
  nextTopics: ["horizontal-scaling"], previousTopics: ["iceberg"],
  commonMistakes: ["Using Merge-on-Read when query performance is the top priority"],
  interviewQuestions: ["Copy-on-Write vs Merge-on-Read in Hudi?"],
  flashcards: [
    { front: "CoW vs MoR in Hudi?", back: "Copy-on-Write rewrites Parquet files on every update (optimized for fast reads). Merge-on-Read writes updates to Avro logs and merges them during the read (optimized for fast writes/upserts)." }
  ],
  summary: "Hudi excels at streaming upserts and change data capture on the data lake using its Merge-on-Read capability."
},

// ═══════════════════════════════════════════════════════════════════
// DISTRIBUTED COMPUTING
// ═══════════════════════════════════════════════════════════════════
{
  id: "horizontal-scaling", title: "Horizontal vs Vertical Scaling", phase: "distributed", phaseLabel: "Distributed Computing",
  description: "Understand the core concept of distributed computing — scaling out vs scaling up, and the challenges of distributed systems.",
  difficulty: "beginner", estimatedHours: 2, importance: "must-know", interviewWeight: 4,
  careerLevel: "foundation", interviewImportance: 4, productionImportance: 4,
  interviewRecommendation: "Learn Well — fundamental concept for system design",
  prerequisites: ["what-is-de"], learningObjectives: [
    "Define horizontal and vertical scaling",
    "Identify the limits of vertical scaling",
    "Understand the CAP theorem briefly",
    "Know why big data requires distributed systems"
  ],
  problemItSolves: "When a database becomes too slow or too full, you can buy a bigger machine (vertical). But eventually, you hit the physical limits of hardware. Horizontal scaling solves this by linking many cheap machines together.",
  whyItExists: "Google's 2004 MapReduce paper popularized the idea that processing massive data requires splitting it across thousands of commodity computers rather than buying one massive supercomputer.",
  realWorldUsage: "PostgreSQL usually scales vertically (bigger EC2 instance). Cassandra, Kafka, and Spark scale horizontally (adding more instances to a cluster).",
  theory: "## Scaling Systems\n\n### Vertical Scaling (Scaling Up)\n- Adding more CPU, RAM, or Disk to a single machine.\n- **Pros**: Simple, no code changes, no network latency between components.\n- **Cons**: Expensive, hardware limits, single point of failure.\n\n### Horizontal Scaling (Scaling Out)\n- Adding more machines (nodes) to a network (cluster).\n- **Pros**: Infinite scale, cheaper commodity hardware, fault tolerance.\n- **Cons**: Complex to manage, network latency, requires distributed software (Spark, Kafka).\n\n### Distributed System Challenges\n- Network partitions (servers can't talk to each other)\n- Clock synchronization\n- Data consistency vs availability",
  resources: {
    docs: [], youtube: [], udemy: [], articles: []
  },
  miniProject: null, exercises: [],
  nextTopics: ["partitions-dist"], previousTopics: ["data-pipeline"],
  commonMistakes: ["Defaulting to complex distributed systems when a single large PostgreSQL instance would suffice"],
  interviewQuestions: ["What is the difference between horizontal and vertical scaling?", "What are the drawbacks of horizontal scaling?"],
  flashcards: [
    { front: "Horizontal vs Vertical Scaling?", back: "Horizontal (scale out): add more machines to a cluster. Vertical (scale up): add more CPU/RAM to a single machine." }
  ],
  summary: "Big data relies on horizontal scaling. It offers infinite scalability and fault tolerance at the cost of software complexity and network latency."
},
{
  id: "partitions-dist", title: "Partitioning & Sharding", phase: "distributed", phaseLabel: "Distributed Computing",
  description: "Learn how data is split across multiple machines in a distributed system to enable parallel processing.",
  difficulty: "intermediate", estimatedHours: 3, importance: "must-know", interviewWeight: 5,
  careerLevel: "junior", interviewImportance: 5, productionImportance: 5,
  interviewRecommendation: "Learn Deeply — you must know partitioning for Spark, Kafka, and databases",
  prerequisites: ["horizontal-scaling"], learningObjectives: [
    "Define partitioning and sharding",
    "Understand horizontal partitioning (by key, hash, range)",
    "Identify the 'hot partition' problem / data skew",
    "Know how partitioning enables parallel compute"
  ],
  problemItSolves: "You can have 100 machines, but if all the data sits on one machine, the other 99 do nothing. Partitioning splits the data so all machines can work on their chunk simultaneously.",
  whyItExists: "Partitioning is the fundamental mechanism that makes distributed storage (Cassandra) and distributed compute (Spark) possible.",
  realWorldUsage: "In S3, data is partitioned by folders (`year=2023/month=10`). In Kafka, topics are partitioned to allow concurrent readers. In Spark, RDDs are partitioned across executor memory.",
  theory: "## Partitioning (Sharding)\n\n### Strategies\n1. **Range Partitioning**: e.g., A-M on Server 1, N-Z on Server 2. Good for range queries, bad for hot spots.\n2. **Hash Partitioning**: e.g., `hash(user_id) % 4`. Distributes data evenly, bad for range queries.\n\n### Data Skew\nThe enemy of distributed computing. If you partition sales by country, the 'USA' partition might be 100x larger than 'Iceland'. The machine processing 'USA' will become a bottleneck (straggler), while other machines finish quickly and sit idle.",
  resources: {
    docs: [], youtube: [], udemy: [], articles: []
  },
  miniProject: null, exercises: ["Identify a good and bad partition key for a multi-tenant SaaS application"],
  nextTopics: ["driver-executors"], previousTopics: ["horizontal-scaling"],
  commonMistakes: ["Partitioning a data lake by day when there is only 1MB of data per day (small file problem)", "Choosing a partition key with low cardinality, leading to data skew"],
  interviewQuestions: ["What is data skew and how do you fix it?", "How would you partition a time-series database?", "Hash vs Range partitioning?"],
  flashcards: [
    { front: "What is data skew?", back: "When data is unevenly distributed across partitions. One machine gets a massive chunk of data and becomes a bottleneck, defeating the purpose of parallel processing." },
    { front: "What is salting?", back: "A technique to fix data skew by adding a random number to the partition key (e.g., USA_1, USA_2), forcing the skewed data to split across multiple partitions." }
  ],
  summary: "Partitioning distributes data across machines. A good partition key distributes data evenly. A bad key causes data skew and kills performance."
},
{
  id: "driver-executors", title: "Master-Worker Architecture", phase: "distributed", phaseLabel: "Distributed Computing",
  description: "Understand the Master-Worker (Driver-Executor) paradigm used by Spark, Hadoop, and most distributed compute engines.",
  difficulty: "beginner", estimatedHours: 2, importance: "must-know", interviewWeight: 4,
  careerLevel: "foundation", interviewImportance: 4, productionImportance: 4,
  interviewRecommendation: "Learn Well — essential for understanding Spark",
  prerequisites: ["partitions-dist"], learningObjectives: [
    "Define the roles of a Master (Driver) and Worker (Executor)",
    "Understand task scheduling and coordination",
    "Identify single points of failure in distributed architectures"
  ],
  problemItSolves: "If 100 machines are working on a problem, someone needs to tell them what to do, track their progress, and handle machine failures. The Master node solves this coordination problem.",
  whyItExists: "This architecture simplifies distributed system design. Instead of 100 machines negotiating among themselves (peer-to-peer), one machine acts as the boss.",
  realWorldUsage: "In Spark, the Driver is the master and Executors are workers. In Hadoop, the JobTracker is the master. In Kubernetes, the Control Plane is the master and Kubelets are workers.",
  theory: "## Master-Worker Architecture\n\n### The Master (Driver)\n- Runs your `main()` program\n- Plans the execution strategy (creates a DAG)\n- Assigns tasks to workers\n- Monitors worker health (heartbeats)\n- Does **not** process data (usually)\n\n### The Workers (Executors)\n- Hold partitions of data in memory/disk\n- Execute the tasks assigned by the master\n- Return results or write to storage\n- If a worker dies, the master assigns its task to another worker",
  resources: {
    docs: [], youtube: [], udemy: [], articles: []
  },
  miniProject: null, exercises: [],
  nextTopics: ["shuffling"], previousTopics: ["partitions-dist"],
  commonMistakes: ["Calling `collect()` in Spark, which sends all worker data to the master, crashing the master with an OutOfMemoryError"],
  interviewQuestions: ["What happens if a worker node dies?", "What happens if the master node dies?", "Why should you be careful with actions that return data to the driver?"],
  flashcards: [
    { front: "What is the role of the Driver in Spark?", back: "It plans the execution, creates the DAG, requests resources from the cluster manager, and schedules tasks on the Executors. It does NOT process the bulk data." }
  ],
  summary: "Distributed compute relies on a Master (Driver) to coordinate tasks and Workers (Executors) to process the data."
},
{
  id: "shuffling", title: "The Shuffle", phase: "distributed", phaseLabel: "Distributed Computing",
  description: "Deep dive into the Shuffle — the most expensive operation in distributed computing, how it works, and how to avoid it.",
  difficulty: "advanced", estimatedHours: 3, importance: "must-know", interviewWeight: 5,
  careerLevel: "mid", interviewImportance: 5, productionImportance: 5,
  interviewRecommendation: "Learn Deeply — mastering the shuffle separates juniors from seniors",
  prerequisites: ["partitions-dist", "driver-executors"], learningObjectives: [
    "Define what a shuffle is in distributed computing",
    "Understand why GROUP BY and JOIN cause shuffles",
    "Identify the performance costs (Disk I/O, Network I/O, Serialization)",
    "Learn strategies to minimize shuffling"
  ],
  problemItSolves: "If you have sales data partitioned randomly across 10 machines, and you need to calculate `SUM(sales) GROUP BY country`, you must move all 'USA' records to a single machine. The shuffle is the mechanism that redistributes this data.",
  whyItExists: "Data is rarely partitioned perfectly for every query. Shuffling allows data to be dynamically re-partitioned across the network during execution.",
  realWorldUsage: "Every time a data engineer runs a JOIN, DISTINCT, or GROUP BY in Spark or BigQuery, a shuffle occurs under the hood. Optimizing these shuffles is a DE's main job.",
  theory: "## The Shuffle\n\nA shuffle is the physical movement of data across the network between worker nodes to group related data together.\n\n### Why is it expensive?\n1. **Disk I/O**: Workers write shuffle data to local disk (to prevent memory crashes).\n2. **Serialization**: Data must be converted to bytes.\n3. **Network I/O**: Massive amounts of data travel across the network switches.\n4. **Deserialization**: Receiving workers convert bytes back to objects.\n\n### Triggers\n- `groupBy()`, `reduceByKey()`\n- `join()`\n- `distinct()`\n- `repartition()`",
  resources: {
    docs: [], youtube: [], udemy: [], articles: []
  },
  miniProject: null, exercises: [],
  nextTopics: ["resource-management", "why-spark"], previousTopics: ["driver-executors"],
  commonMistakes: ["Using `groupByKey()` instead of `reduceByKey()` in Spark", "Joining two massive tables without filtering first"],
  interviewQuestions: ["What is a shuffle in Spark/Hadoop?", "Why is shuffling expensive?", "How can you avoid or minimize shuffling?"],
  flashcards: [
    { front: "What is a Shuffle?", back: "The physical movement of data across the network to redistribute it among worker nodes. It happens during JOINs and GROUP BYs and is the most expensive distributed operation." },
    { front: "Why is shuffling expensive?", back: "It involves Disk I/O (writing intermediate files), Serialization, Network I/O (transferring data), and Deserialization." }
  ],
  summary: "A shuffle redistributes data across the network. It is the most expensive operation in big data. Optimizing pipelines usually means minimizing shuffles."
},
{
  id: "resource-management", title: "Cluster Resource Management", phase: "distributed", phaseLabel: "Distributed Computing",
  description: "Understand YARN, Mesos, and Kubernetes — the systems that manage CPU and RAM across a cluster of machines.",
  difficulty: "intermediate", estimatedHours: 2, importance: "good-to-know", interviewWeight: 2,
  careerLevel: "mid", interviewImportance: 2, productionImportance: 4,
  interviewRecommendation: "Know Concept — necessary for deploying applications",
  prerequisites: ["driver-executors"], learningObjectives: [
    "Define the role of a cluster manager",
    "Understand the shift from YARN to Kubernetes",
    "Know how resource requests and limits work"
  ],
  problemItSolves: "If you have 100 machines and 5 different data engineering teams want to run Spark jobs simultaneously, who decides which job gets how much CPU and RAM? The cluster manager solves this.",
  whyItExists: "Without resource managers, teams would have to manually assign jobs to specific servers, leading to wasted resources and conflicts.",
  realWorldUsage: "Legacy Hadoop systems use YARN. Modern cloud-native deployments run Spark on Kubernetes. Databricks manages the cluster resources for you invisibly.",
  theory: "## Resource Managers\n\nThe cluster manager sits between the Spark Driver and the physical machines.\n\n1. Spark Driver asks Cluster Manager for 10 executors with 4GB RAM each.\n2. Cluster Manager finds available machines and starts the executors.\n3. Driver sends tasks to those executors.\n\n### Kubernetes (K8s)\nThe modern standard. Packages Spark jobs in Docker containers. Excellent for resource isolation and scaling.",
  resources: {
    docs: [], youtube: [], udemy: [], articles: []
  },
  miniProject: null, exercises: [],
  nextTopics: ["why-spark"], previousTopics: ["shuffling"],
  commonMistakes: ["Requesting too much executor memory, leaving CPUs idle", "Not understanding the difference between the cluster manager (YARN/K8s) and the compute engine (Spark)"],
  interviewQuestions: ["What is the role of YARN or Kubernetes in a big data cluster?"],
  flashcards: [
    { front: "What does a Cluster Manager do?", back: "It allocates physical resources (CPU, RAM) across a cluster of machines to competing applications (like multiple Spark jobs). Examples: YARN, Kubernetes." }
  ],
  summary: "Resource managers (YARN, Kubernetes) allocate CPU and RAM across a cluster, allowing multiple applications to share the same hardware efficiently."
}
];

existingModules.push(...newModules);
fs.writeFileSync('src/data/modules.json', JSON.stringify(existingModules, null, 2));
console.log(`Phase 7: Added ${newModules.length} modules (Storage + Distributed)`);
