const fs = require('fs');

const existingModules = JSON.parse(fs.readFileSync('src/data/modules.json', 'utf8'));

const newModules = [
// ═══════════════════════════════════════════════════════════════════
// STREAMING
// ═══════════════════════════════════════════════════════════════════
{
  id: "kafka-overview", title: "Introduction to Kafka", phase: "streaming", phaseLabel: "Streaming (Kafka)",
  description: "Understand Apache Kafka — the industry standard for distributed event streaming.",
  difficulty: "beginner", estimatedHours: 2, importance: "must-know", interviewWeight: 4,
  careerLevel: "foundation", interviewImportance: 4, productionImportance: 5,
  interviewRecommendation: "Learn Well — the backbone of modern data architectures",
  prerequisites: ["batch-vs-streaming"], learningObjectives: [
    "Define what a distributed commit log is",
    "Understand the Publish-Subscribe pattern",
    "Identify Producers, Consumers, Topics, and Brokers"
  ],
  problemItSolves: "When you have 10 microservices that need to talk to 10 other microservices, creating 100 direct API connections is an unmaintainable mess. Kafka acts as a central nervous system; everyone writes to Kafka, and everyone reads from Kafka.",
  whyItExists: "Created by LinkedIn in 2011. They needed a system that could handle trillions of messages per day (page views, clicks) with extremely low latency, which traditional message queues (RabbitMQ) could not handle.",
  realWorldUsage: "At Netflix, every time you pause a movie, an event is sent to Kafka. That event is consumed by the recommendations team, the analytics team, and the resume-playback team simultaneously.",
  theory: "## Apache Kafka\n\n### The Commit Log\nKafka is fundamentally a distributed append-only log on disk. Data is written sequentially (which is very fast on HDDs) and is immutable.\n\n### Pub-Sub Architecture\n- **Producers**: Applications that write data to Kafka.\n- **Consumers**: Applications that read data from Kafka.\n- **Topics**: Categories or feeds of messages (e.g., `user-clicks`, `payments`).\n- **Brokers**: The physical servers running Kafka.\n\nUnlike traditional queues, reading a message in Kafka DOES NOT delete it. Multiple different consumers can read the same message independently.",
  resources: {
    docs: [{ title: "Kafka Introduction", url: "https://kafka.apache.org/intro" }],
    youtube: [], udemy: [], articles: []
  },
  miniProject: null, exercises: [],
  nextTopics: ["kafka-arch"], previousTopics: ["airflow-arch"],
  commonMistakes: ["Treating Kafka like a database (storing data forever). Kafka usually retains data for 7 days."],
  interviewQuestions: ["What is Kafka?", "How is Kafka different from a traditional message queue like RabbitMQ?", "What is a Topic?"],
  flashcards: [
    { front: "Kafka vs RabbitMQ?", back: "RabbitMQ is a message broker: messages are deleted after being read. Kafka is a distributed commit log: messages are kept for a retention period and can be read multiple times by different consumers." }
  ],
  summary: "Kafka is a distributed commit log used as the central nervous system for real-time data. Producers write to Topics, and independent Consumers read from them."
},
{
  id: "kafka-arch", title: "Kafka Architecture & Partitions", phase: "streaming", phaseLabel: "Streaming (Kafka)",
  description: "Deep dive into Kafka internals — Partitions, Offsets, Consumer Groups, and Zookeeper/KRaft.",
  difficulty: "intermediate", estimatedHours: 4, importance: "must-know", interviewWeight: 5,
  careerLevel: "junior", interviewImportance: 5, productionImportance: 5,
  interviewRecommendation: "Learn Deeply — guaranteed interview questions on Consumer Groups",
  prerequisites: ["kafka-overview", "partitions-dist"], learningObjectives: [
    "Understand how Topics are divided into Partitions",
    "Explain what an Offset is",
    "Master the concept of Consumer Groups and scalability",
    "Understand Replication for fault tolerance"
  ],
  problemItSolves: "A single server can only process so many messages per second. Kafka scales horizontally by splitting a Topic into Partitions across multiple servers, allowing parallel writing and reading.",
  whyItExists: "To achieve LinkedIn's massive scale, the system had to be distributed. The Partition is the fundamental unit of parallelism in Kafka.",
  realWorldUsage: "Data engineers tune the number of partitions to scale out consumer applications. If processing is falling behind, they increase partitions and add more consumers.",
  theory: "## Kafka Internals\n\n### Partitions & Offsets\nA Topic is split into Partitions (e.g., `payments-0`, `payments-1`). \n- Within a partition, messages are strictly ordered.\n- Every message gets a sequential ID called an **Offset**.\n- There is NO ordering guarantee across different partitions.\n\n### Consumer Groups\nThis is how Kafka scales reads. \n- If 4 consumers share the same `group.id`, Kafka will distribute the partitions among them.\n- **Crucial Rule**: A single partition can only be read by ONE consumer in a group at a time. If you have 3 partitions and 4 consumers, the 4th consumer does nothing (sits idle).\n\n### Zookeeper / KRaft\nThe metadata manager. It tracks which brokers are alive and which broker is the 'Leader' for a specific partition. (KRaft replaced Zookeeper in modern Kafka).",
  resources: {
    docs: [], youtube: [], udemy: [], articles: []
  },
  miniProject: null, exercises: ["Calculate the max number of consumers you can run if a topic has 12 partitions"],
  nextTopics: ["kafka-streams"], previousTopics: ["kafka-overview"],
  commonMistakes: ["Trying to enforce global ordering across a topic. (You can only guarantee order WITHIN a partition by hashing the message key)."],
  interviewQuestions: ["What is a Consumer Group?", "If I have a topic with 5 partitions and a consumer group with 10 consumers, what happens?", "How does Kafka guarantee message order?"],
  flashcards: [
    { front: "Consumer Group Partition Limit?", back: "A partition can only be read by ONE consumer in a group at a time. If you have more consumers than partitions, the extra consumers will sit idle." },
    { front: "How to guarantee order in Kafka?", back: "Kafka only guarantees order WITHIN a partition. To ensure all events for 'User A' are processed in order, set the message Key to 'User A'. Kafka hashes the key to ensure it always lands in the same partition." }
  ],
  summary: "Partitions allow Kafka to scale. Offsets track consumer progress. Consumer Groups allow parallel reading, but you cannot have more active consumers than partitions."
},
{
  id: "kafka-streams", title: "Kafka Streams & ksqlDB", phase: "streaming", phaseLabel: "Streaming (Kafka)",
  description: "Learn how to process data in real-time as it flows through Kafka using Kafka Streams or ksqlDB.",
  difficulty: "advanced", estimatedHours: 3, importance: "good-to-know", interviewWeight: 2,
  careerLevel: "mid", interviewImportance: 2, productionImportance: 3,
  interviewRecommendation: "Know Concept — useful for real-time applications",
  prerequisites: ["kafka-arch"], learningObjectives: [
    "Understand Stream Processing vs Batch Processing",
    "Explain Stateful vs Stateless processing",
    "Understand Windowing (Tumbling, Hopping, Session)",
    "Know when to use Kafka Streams vs Spark Structured Streaming"
  ],
  problemItSolves: "You have a stream of raw clicks in a Kafka topic, and you want to output a stream of 'clicks per user per minute' into another topic. Doing this manually requires complex state management. Kafka Streams handles the state and fault tolerance.",
  whyItExists: "Kafka originally was just a pipe. Confluent added Kafka Streams to allow developers to build real-time applications directly on top of Kafka without needing a separate cluster (like Spark/Flink).",
  realWorldUsage: "Used for real-time fraud detection, live leaderboards, and real-time inventory updates.",
  theory: "## Stream Processing\n\n### Kafka Streams (Java/Scala)\nA library you embed in your microservice. It consumes a topic, processes it (filter, map, aggregate), and writes to an output topic.\n\n### ksqlDB\nA SQL engine on top of Kafka Streams. Allows you to write streaming applications using SQL.\n```sql\nCREATE STREAM fraudulent_clicks AS\nSELECT user_id, count(*)\nFROM clicks WINDOW TUMBLING (SIZE 1 MINUTE)\nGROUP BY user_id\nHAVING count(*) > 100;\n```\n\n### Windowing\nGrouping events by time.\n- **Tumbling**: Fixed, non-overlapping (e.g., 1:00-1:05, 1:05-1:10).\n- **Hopping**: Overlapping (e.g., 5 min window, advancing every 1 min).\n- **Session**: Grouped by activity bursts, separated by a gap of inactivity.",
  resources: {
    docs: [], youtube: [], udemy: [], articles: []
  },
  miniProject: null, exercises: [],
  nextTopics: ["flink"], previousTopics: ["kafka-arch"],
  commonMistakes: ["Ignoring late-arriving data when defining windows"],
  interviewQuestions: ["What are the different types of windows in stream processing?", "Stateless vs Stateful stream processing?"],
  flashcards: [
    { front: "Tumbling vs Hopping Window?", back: "Tumbling windows are fixed size and do not overlap (e.g., exactly every 5 mins). Hopping windows are fixed size but overlap (e.g., 5 min window that updates every 1 min)." }
  ],
  summary: "Kafka Streams and ksqlDB allow real-time transformations and aggregations on Kafka topics, utilizing time windows (Tumbling, Hopping, Session)."
},
{
  id: "flink", title: "Apache Flink", phase: "streaming", phaseLabel: "Streaming (Kafka)",
  description: "Understand Apache Flink — the most powerful distributed stream processing engine.",
  difficulty: "advanced", estimatedHours: 2, importance: "good-to-know", interviewWeight: 2,
  careerLevel: "senior", interviewImportance: 2, productionImportance: 3,
  interviewRecommendation: "Know Concept — the gold standard for heavy streaming",
  prerequisites: ["kafka-streams"], learningObjectives: [
    "Understand true streaming vs micro-batching (Spark)",
    "Explain Event Time vs Processing Time",
    "Understand exactly-once semantics"
  ],
  problemItSolves: "Spark Structured Streaming uses micro-batches (processing data every 1 second). If you need sub-millisecond latency (like high-frequency trading), micro-batching is too slow. Flink processes event-by-event.",
  whyItExists: "Flink was built from the ground up as a pure streaming engine (unlike Spark, which is a batch engine that simulates streaming).",
  realWorldUsage: "Uber, Alibaba, and Netflix use Flink for massive-scale, ultra-low latency stream processing.",
  theory: "## Apache Flink\n\n### True Streaming vs Micro-batch\n- **Spark**: Collects events for a short period (e.g., 500ms), then processes them as a tiny batch.\n- **Flink**: Processes each event the instant it arrives.\n\n### Event Time vs Processing Time\n- **Event Time**: The timestamp when the event actually occurred on the user's phone.\n- **Processing Time**: The timestamp when the Flink server received the event.\nFlink excels at handling out-of-order events using Event Time and 'Watermarks' (a grace period for late data).",
  resources: {
    docs: [], youtube: [], udemy: [], articles: []
  },
  miniProject: null, exercises: [],
  nextTopics: ["aws-iam"], previousTopics: ["kafka-streams"],
  commonMistakes: ["Using Flink when batch processing would suffice (streaming is hard and expensive to maintain)"],
  interviewQuestions: ["Difference between Spark Streaming and Flink?", "What is Event Time vs Processing Time?"],
  flashcards: [
    { front: "Spark Streaming vs Flink?", back: "Spark uses micro-batching (near real-time). Flink uses continuous, event-by-event processing (true real-time, lower latency)." }
  ],
  summary: "Flink is the most powerful engine for true, event-by-event stream processing with robust state management and exactly-once semantics."
},

// ═══════════════════════════════════════════════════════════════════
// CLOUD PLATFORMS (AWS Focus)
// ═══════════════════════════════════════════════════════════════════
{
  id: "aws-iam", title: "AWS IAM & Security", phase: "aws", phaseLabel: "AWS",
  description: "Master Identity and Access Management — the foundation of cloud security.",
  difficulty: "beginner", estimatedHours: 3, importance: "must-know", interviewWeight: 2,
  careerLevel: "foundation", interviewImportance: 2, productionImportance: 5,
  interviewRecommendation: "Know Concept — critical for production work",
  prerequisites: ["linux"], learningObjectives: [
    "Differentiate Users, Groups, and Roles",
    "Understand the Principle of Least Privilege",
    "Write basic IAM JSON policies"
  ],
  problemItSolves: "You don't want to hardcode API keys into your Spark code to access S3. If the code leaks, your data is compromised. IAM Roles allow EC2/Spark to access S3 securely without any passwords.",
  whyItExists: "Security in the cloud cannot rely on physical firewalls. Identity is the new firewall.",
  realWorldUsage: "Data engineers attach IAM Roles to Airflow workers or Spark clusters, granting them permission to read from specific S3 buckets and write to specific Redshift tables.",
  theory: "## AWS IAM\n\n### Core Concepts\n- **Users**: Long-term credentials for humans (Passwords, Access Keys).\n- **Roles**: Short-term credentials for services/machines (EC2, Lambda). **Never hardcode keys; use roles.**\n- **Policies**: JSON documents defining what actions are allowed or denied.\n\n### Principle of Least Privilege\nAlways give the minimum permissions required. Don't give `s3:*` (full access to all buckets) if the script only needs `s3:GetObject` on `bucket-a`.",
  resources: {
    docs: [], youtube: [], udemy: [], articles: []
  },
  miniProject: null, exercises: ["Write an IAM JSON policy that allows reading from one specific S3 bucket and writing to another"],
  nextTopics: ["s3"], previousTopics: ["flink"],
  commonMistakes: ["Hardcoding AWS Access Keys in GitHub", "Using the AWS Root Account for daily tasks", "Attaching AdministratorAccess to everything because it's easier"],
  interviewQuestions: ["What is the difference between an IAM User and an IAM Role?", "What is the Principle of Least Privilege?"],
  flashcards: [
    { front: "IAM User vs IAM Role?", back: "Users are for humans and have long-term credentials (passwords/keys). Roles are for machines/services (EC2, Lambda) and provide temporary, rotating credentials. Always use Roles for applications." }
  ],
  summary: "IAM controls who can do what in AWS. Use Roles for machines, never hardcode access keys, and always follow the principle of least privilege."
},
{
  id: "s3", title: "Amazon S3 (Object Storage)", phase: "aws", phaseLabel: "AWS",
  description: "Learn Amazon S3 — the foundational storage layer for almost all modern data lakes.",
  difficulty: "beginner", estimatedHours: 2, importance: "must-know", interviewWeight: 2,
  careerLevel: "foundation", interviewImportance: 2, productionImportance: 5,
  interviewRecommendation: "Know Concept — fundamental knowledge",
  prerequisites: ["aws-iam"], learningObjectives: [
    "Understand Object Storage vs Block Storage",
    "Know S3 bucket naming and prefixes (folders)",
    "Understand S3 storage classes (Standard vs Glacier)"
  ],
  problemItSolves: "Traditional hard drives (Block storage) have size limits and are expensive. S3 provides infinitely scalable, cheap storage where data is replicated across multiple data centers automatically.",
  whyItExists: "S3 was AWS's first service (2006). It decoupled storage from compute, creating the foundation for modern cloud architecture and data lakes.",
  realWorldUsage: "The Bronze, Silver, and Gold Parquet/Delta files of a Lakehouse are stored in S3. Snowflake, Databricks, and Athena all read data directly from S3.",
  theory: "## Amazon S3\n\n### Object Storage\nUnlike a regular file system (C: drive), S3 doesn't have true folders. It uses a flat namespace with **Prefixes**.\n- `s3://my-lake/year=2023/file.parquet` -> `year=2023/` is just a string prefix in the object key.\n\n### Features\n- **Durability**: 99.999999999% (11 nines). Data is rarely lost.\n- **Storage Classes**: \n  - Standard (Hot data, fast, expensive)\n  - Standard-IA (Infrequent Access, cheaper storage, costs money to read)\n  - Glacier (Cold archive, very cheap, takes hours to retrieve)",
  resources: {
    docs: [], youtube: [], udemy: [], articles: []
  },
  miniProject: null, exercises: [],
  nextTopics: ["ec2"], previousTopics: ["aws-iam"],
  commonMistakes: ["Making a bucket public accidentally, leaking corporate data", "Using S3 for highly transactional, sub-millisecond read/writes (use a DB for that)"],
  interviewQuestions: ["What is the difference between Object Storage (S3) and Block Storage (EBS)?", "How do you reduce costs in S3?"],
  flashcards: [
    { front: "Object Storage (S3) vs Block Storage (EBS)?", back: "EBS is a physical hard drive attached to one EC2 instance (fast, OS runs here). S3 is infinitely scalable object storage accessed via API (cheap, highly durable, perfect for data lakes)." }
  ],
  summary: "S3 is infinitely scalable, highly durable object storage. It is the storage backbone of the modern data lake."
},
{
  id: "ec2", title: "Amazon EC2 & Compute", phase: "aws", phaseLabel: "AWS",
  description: "Understand EC2 instances, security groups, and VPCs.",
  difficulty: "beginner", estimatedHours: 2, importance: "good-to-know", interviewWeight: 1,
  careerLevel: "foundation", interviewImportance: 1, productionImportance: 3,
  interviewRecommendation: "Know Concept — basic cloud infrastructure",
  prerequisites: ["s3"], learningObjectives: [
    "Understand Virtual Machines (EC2)",
    "Configure Security Groups (Firewalls)",
    "Understand VPC basics (Subnets, Public/Private)"
  ],
  problemItSolves: "Buying physical servers takes months. EC2 allows you to rent servers by the second and terminate them when finished.",
  whyItExists: "The core compute offering of AWS, allowing companies to migrate legacy workloads to the cloud.",
  realWorldUsage: "Airflow schedulers, custom Python ingestion scripts, and unmanaged databases often run on EC2 instances.",
  theory: "## Amazon EC2\n\n### Security Groups\nA virtual firewall for your EC2 instance.\n- **Inbound Rules**: Control who can connect TO the instance (e.g., Allow port 22 for SSH from your IP only).\n- **Outbound Rules**: Control where the instance can connect TO (usually allow all).\n\n### VPC (Virtual Private Cloud)\nA logically isolated section of the AWS cloud.\n- **Public Subnet**: Has a route to the internet (Web servers).\n- **Private Subnet**: No direct internet access. (Databases, Data Processing Clusters run here for security).",
  resources: {
    docs: [], youtube: [], udemy: [], articles: []
  },
  miniProject: null, exercises: [],
  nextTopics: ["rds"], previousTopics: ["s3"],
  commonMistakes: ["Opening port 22 (SSH) to 0.0.0.0/0 (the entire internet)", "Putting databases in a Public Subnet"],
  interviewQuestions: ["What is a Security Group?", "Why use a Private Subnet?"],
  flashcards: [
    { front: "What is a Security Group?", back: "A virtual firewall attached to an EC2 instance that controls inbound and outbound network traffic based on IP addresses and ports." }
  ],
  summary: "EC2 provides virtual servers. Secure them using Security Groups (firewalls) and VPC Private Subnets."
},
{
  id: "rds", title: "Amazon RDS & Database Services", phase: "aws", phaseLabel: "AWS",
  description: "Overview of managed databases in AWS (RDS, Aurora, DynamoDB).",
  difficulty: "beginner", estimatedHours: 2, importance: "good-to-know", interviewWeight: 2,
  careerLevel: "foundation", interviewImportance: 2, productionImportance: 3,
  interviewRecommendation: "Know Concept — primarily source systems for DEs",
  prerequisites: ["ec2"], learningObjectives: [
    "Understand managed vs unmanaged databases",
    "Compare RDS (Postgres/MySQL) with DynamoDB (NoSQL)"
  ],
  problemItSolves: "Managing database backups, patching, and high-availability replication manually on EC2 is a nightmare. RDS handles this automatically.",
  whyItExists: "To remove the operational burden of Database Administration (DBA) tasks.",
  realWorldUsage: "Data engineers extract data from RDS (the OLTP source) to load into the Data Warehouse. They rarely manage RDS, but must understand it to extract data via CDC.",
  theory: "## AWS Databases\n\n- **RDS**: Managed relational databases (PostgreSQL, MySQL, SQL Server). OLTP workloads.\n- **Aurora**: Amazon's cloud-native relational DB. 5x faster than standard MySQL. Storage auto-scales.\n- **DynamoDB**: Managed NoSQL Key-Value store. Single-digit millisecond latency at any scale. Used for extreme scale web applications.",
  resources: {
    docs: [], youtube: [], udemy: [], articles: []
  },
  miniProject: null, exercises: [],
  nextTopics: ["redshift"], previousTopics: ["ec2"],
  commonMistakes: ["Running analytical (OLAP) queries directly on the production RDS instance, slowing down the app for users."],
  interviewQuestions: ["RDS vs DynamoDB?"],
  flashcards: [
    { front: "Aurora vs standard RDS?", back: "Aurora is AWS's proprietary, cloud-native relational database. It decouples compute and storage, replicates data 6 ways across 3 zones automatically, and is significantly faster and more resilient than standard RDS." }
  ],
  summary: "RDS and Aurora are managed relational databases (OLTP). DynamoDB is a managed NoSQL database. These are the primary sources data engineers extract from."
},
{
  id: "redshift", title: "Amazon Redshift", phase: "aws", phaseLabel: "AWS",
  description: "Learn Amazon Redshift — AWS's enterprise Data Warehouse.",
  difficulty: "intermediate", estimatedHours: 3, importance: "good-to-know", interviewWeight: 3,
  careerLevel: "junior", interviewImportance: 3, productionImportance: 3,
  interviewRecommendation: "Know Concept — Snowflake is more popular, but Redshift is still huge",
  prerequisites: ["rds", "data-warehouse"], learningObjectives: [
    "Understand Redshift's MPP (Massively Parallel Processing) architecture",
    "Explain Distribution Styles (KEY, ALL, EVEN)",
    "Explain Sort Keys"
  ],
  problemItSolves: "RDS (Postgres) chokes when running aggregations over a billion rows. Redshift uses columnar storage and MPP to run these queries in seconds.",
  whyItExists: "Launched in 2012 based on ParAccel. It was the first cloud data warehouse that disrupted expensive on-premise solutions like Teradata.",
  realWorldUsage: "Many companies use Redshift as their central data warehouse, loading data via Airflow and transforming it via dbt.",
  theory: "## Amazon Redshift\n\n### MPP Architecture\nA Leader node receives queries, optimizes them, and distributes the execution to multiple Compute nodes.\n\n### Distribution Styles (Crucial for Performance)\nHow is data distributed across the compute nodes?\n1. **DISTSTYLE EVEN**: Round-robin. Good for tables without joins.\n2. **DISTSTYLE ALL**: A full copy of the table is on every node. Excellent for small dimension tables (acts like a Spark Broadcast join!).\n3. **DISTSTYLE KEY**: Distributed by a hash of a specific column. If you join Table A and Table B on `user_id`, setting `user_id` as the DISTKEY ensures matching rows are on the same node, preventing network shuffles!\n\n### Sort Keys\nDetermines the physical order of data on disk (like an index). Used to skip reading data blocks.",
  resources: {
    docs: [], youtube: [], udemy: [], articles: []
  },
  miniProject: null, exercises: [],
  nextTopics: ["docker"], previousTopics: ["rds"],
  commonMistakes: ["Setting DISTSTYLE ALL on a 1-billion row fact table, crashing the cluster", "Using a low-cardinality DISTKEY (like gender), causing massive data skew"],
  interviewQuestions: ["What are the Distribution Styles in Redshift?", "How do you optimize joins in Redshift?"],
  flashcards: [
    { front: "DISTSTYLE ALL vs KEY in Redshift?", back: "ALL places a full copy of the table on every node (best for small dimension tables). KEY hashes a column and distributes rows accordingly (best for large fact tables to colocate join keys)." }
  ],
  summary: "Redshift is an MPP columnar data warehouse. Optimizing it requires choosing the correct Distribution Styles (ALL, KEY, EVEN) to minimize network shuffles."
},

// ═══════════════════════════════════════════════════════════════════
// DEVOPS & CI/CD
// ═══════════════════════════════════════════════════════════════════
{
  id: "docker", title: "Docker & Containerization", phase: "devops", phaseLabel: "DevOps & IaC",
  description: "Understand Docker — how to package your code and its dependencies into a standard unit.",
  difficulty: "beginner", estimatedHours: 3, importance: "must-know", interviewWeight: 2,
  careerLevel: "foundation", interviewImportance: 2, productionImportance: 5,
  interviewRecommendation: "Know Concept — mandatory for modern deployments",
  prerequisites: ["linux"], learningObjectives: [
    "Understand the 'It works on my machine' problem",
    "Explain Image vs Container",
    "Write a basic Dockerfile for a Python script"
  ],
  problemItSolves: "Your Python script works on your Mac, but fails on the production Linux server because of missing C++ libraries. Docker packages the OS, libraries, and code into one container that runs exactly the same everywhere.",
  whyItExists: "Virtual machines (VMs) are heavy and slow to start because they include a full guest OS. Containers share the host OS kernel, making them lightweight and fast.",
  realWorldUsage: "Airflow workers, dbt jobs, and Spark applications are packaged as Docker images and run on Kubernetes.",
  theory: "## Docker\n\n### Concepts\n- **Image**: The blueprint (read-only). Built from a `Dockerfile`.\n- **Container**: A running instance of an Image.\n- **Dockerfile**: Text file containing instructions to build the image.\n\n### Basic Dockerfile\n```dockerfile\nFROM python:3.9-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install -r requirements.txt\nCOPY . .\nCMD [\"python\", \"pipeline.py\"]\n```",
  resources: {
    docs: [], youtube: [], udemy: [], articles: []
  },
  miniProject: null, exercises: ["Dockerize a simple Python API ingestion script"],
  nextTopics: ["ci-cd"], previousTopics: ["redshift"],
  commonMistakes: ["Running containers as root user in production", "Copying the entire project directory before installing requirements (breaks layer caching)"],
  interviewQuestions: ["Difference between Docker and a Virtual Machine?", "What is an Image vs a Container?"],
  flashcards: [
    { front: "Docker vs Virtual Machine?", back: "VMs virtualize the hardware and include a full Guest OS (heavy, slow). Docker virtualizes the OS, sharing the Host kernel (lightweight, fast, uses less memory)." }
  ],
  summary: "Docker solves the 'it works on my machine' problem by packaging code and dependencies into portable, lightweight containers."
},
{
  id: "ci-cd", title: "CI/CD (GitHub Actions)", phase: "devops", phaseLabel: "DevOps & IaC",
  description: "Learn Continuous Integration and Continuous Deployment — automating testing and deployment of data pipelines.",
  difficulty: "intermediate", estimatedHours: 3, importance: "good-to-know", interviewWeight: 2,
  careerLevel: "mid", interviewImportance: 2, productionImportance: 5,
  interviewRecommendation: "Know Concept — expected knowledge for Mid/Senior roles",
  prerequisites: ["git", "docker"], learningObjectives: [
    "Define CI (testing) and CD (deployment)",
    "Understand how GitHub Actions workflows run",
    "Design a CI/CD pipeline for a dbt project"
  ],
  problemItSolves: "Manually copying scripts to a production server is error-prone and dangerous. CI/CD automates running tests when you create a PR, and automatically deploys the code when merged to main.",
  whyItExists: "Software engineering best practices moved to data engineering (DataOps). Automation prevents bad code from reaching production.",
  realWorldUsage: "When a DE opens a Pull Request with dbt changes, a GitHub Action spins up a temporary database, runs `dbt test`, and only allows the merge if tests pass. On merge, it triggers Airflow to use the new code.",
  theory: "## CI/CD\n\n### Continuous Integration (CI)\nFocuses on testing. Runs automatically on Pull Requests.\n- Lint code (flake8, sqlfluff)\n- Run unit tests (pytest)\n- Run data tests on a staging environment\n\n### Continuous Deployment (CD)\nFocuses on shipping. Runs automatically on merges to `main`.\n- Build Docker images\n- Push to Elastic Container Registry (ECR)\n- Update Airflow/Kubernetes configurations to use the new image",
  resources: {
    docs: [], youtube: [], udemy: [], articles: []
  },
  miniProject: null, exercises: ["Write a GitHub Actions YAML file that runs `pytest` on your Python code when you open a PR"],
  nextTopics: ["terraform"], previousTopics: ["docker"],
  commonMistakes: ["Testing against production data in a CI pipeline (use a staging database instead)"],
  interviewQuestions: ["What is CI/CD?", "How would you automate testing for a dbt project?"],
  flashcards: [
    { front: "What is CI/CD?", back: "Continuous Integration (automating tests when code is committed/PR'd) and Continuous Deployment (automating the release of that code to production after merging)." }
  ],
  summary: "CI/CD automates testing and deployment. It is the core of DataOps, ensuring only high-quality, tested code reaches production."
},
{
  id: "terraform", title: "Infrastructure as Code (Terraform)", phase: "devops", phaseLabel: "DevOps & IaC",
  description: "Understand Terraform — how to provision cloud resources using code instead of clicking through a UI.",
  difficulty: "advanced", estimatedHours: 2, importance: "good-to-know", interviewWeight: 1,
  careerLevel: "senior", interviewImportance: 1, productionImportance: 4,
  interviewRecommendation: "Know Concept — mostly for platform engineers, but DEs should know it",
  prerequisites: ["aws-iam", "s3"], learningObjectives: [
    "Define Infrastructure as Code (IaC)",
    "Understand Terraform's declarative nature",
    "Explain the concept of Terraform State"
  ],
  problemItSolves: "Clicking through the AWS console to create 5 S3 buckets, 2 IAM roles, and a Redshift cluster takes hours and is impossible to replicate exactly in another environment. IaC allows you to write this configuration in code and deploy it instantly.",
  whyItExists: "Created by HashiCorp. As cloud environments became complex, infrastructure needed to be version-controlled, reviewed, and tested just like application code.",
  realWorldUsage: "Data engineers use Terraform to provision their Airflow clusters, Snowflake warehouses, and S3 buckets, ensuring Dev, Staging, and Prod environments are identical.",
  theory: "## Terraform\n\n### Declarative Code\nYou define WHAT you want (e.g., an S3 bucket), not HOW to create it. Terraform figures out the API calls.\n\n```hcl\nresource \"aws_s3_bucket\" \"data_lake\" {\n  bucket = \"my-company-data-lake-prod\"\n}\n```\n\n### The State File\nTerraform maintains a `terraform.tfstate` file (usually stored in S3). This tracks the mapping between your code and the real resources in AWS. When you run `terraform plan`, it compares your code to the State file to see what needs to be created, updated, or deleted.",
  resources: {
    docs: [], youtube: [], udemy: [], articles: []
  },
  miniProject: null, exercises: [],
  nextTopics: ["de-projects"], previousTopics: ["ci-cd"],
  commonMistakes: ["Committing the `terraform.tfstate` file to Git (it often contains plaintext secrets!)"],
  interviewQuestions: ["What is Infrastructure as Code?", "What is the Terraform State file?"],
  flashcards: [
    { front: "What is Infrastructure as Code (IaC)?", back: "Managing and provisioning cloud infrastructure (servers, databases, networks) through machine-readable definition files (code), rather than physical hardware configuration or interactive configuration tools." }
  ],
  summary: "Terraform is declarative Infrastructure as Code. It allows you to version control and automate the provisioning of cloud resources."
}
];

existingModules.push(...newModules);
fs.writeFileSync('src/data/modules.json', JSON.stringify(existingModules, null, 2));
console.log(`Phase 10: Added ${newModules.length} modules (Streaming + AWS + DevOps)`);
