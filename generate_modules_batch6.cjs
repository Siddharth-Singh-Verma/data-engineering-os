const fs = require('fs');

const existingModules = JSON.parse(fs.readFileSync('src/data/modules.json', 'utf8'));

const newModules = [
// ═══════════════════════════════════════════════════════════════════
// CAPSTONE PROJECTS
// ═══════════════════════════════════════════════════════════════════
{
  id: "de-projects", title: "Building Portfolio Projects", phase: "projects", phaseLabel: "Capstone Projects",
  description: "Learn what makes a data engineering portfolio project stand out to hiring managers.",
  difficulty: "beginner", estimatedHours: 1, importance: "must-know", interviewWeight: 4,
  careerLevel: "foundation", interviewImportance: 4, productionImportance: 3,
  interviewRecommendation: "Learn Well — your projects are your resume",
  prerequisites: ["python", "sql", "data-pipeline"], learningObjectives: [
    "Understand what hiring managers look for in a project",
    "Identify the 'Anti-Patterns' (what NOT to build)",
    "Learn how to document a project on GitHub"
  ],
  problemItSolves: "Most beginners build the exact same 'Twitter Sentiment Analysis' project. Hiring managers ignore these. You need to build projects that demonstrate actual data engineering skills.",
  whyItExists: "A portfolio project is the best way to bypass the 'Need experience to get a job, need a job to get experience' loop.",
  realWorldUsage: "During an interview, you will spend 20-30 minutes explaining your architecture choices from your portfolio project.",
  theory: "## What Makes a Great DE Project?\n\n### The Anti-Patterns (Avoid These)\n- Scraping a single CSV and making a bar chart (That's Data Analysis).\n- Training a machine learning model (That's Data Science).\n- Following a YouTube tutorial step-by-step and copying the code.\n\n### The Winning Formula\n1. **Real-world messy data**: Use public APIs (Reddit, Weather, Crypto, Transit).\n2. **Cloud Infrastructure**: Deploy it on AWS/GCP (even if using free tier).\n3. **Automation**: Use Airflow/GitHub Actions to run it daily.\n4. **Transformation**: Use dbt or Spark to clean the data.\n5. **Documentation**: A massive, detailed README with an Architecture Diagram.",
  resources: {
    docs: [], youtube: [], udemy: [], articles: []
  },
  miniProject: null, exercises: ["Draw an architecture diagram for your ideal capstone project"],
  nextTopics: ["batch-project"], previousTopics: ["terraform"],
  commonMistakes: ["Spending 90% of the time building a React dashboard instead of focusing on the data pipeline"],
  interviewQuestions: ["Walk me through your most complex data engineering project.", "What was the hardest technical challenge you faced in this project?"],
  flashcards: [
    { front: "What are the 3 key components of a DE portfolio project?", back: "1. Cloud infrastructure. 2. Automated orchestration (e.g., Airflow). 3. Complex transformation (e.g., dbt or Spark)." }
  ],
  summary: "Great projects focus on pipeline automation, cloud infrastructure, and data transformation. Avoid simple CSV analysis or ML models."
},
{
  id: "batch-project", title: "Project: Modern Batch Lakehouse", phase: "projects", phaseLabel: "Capstone Projects",
  description: "Build an end-to-end batch pipeline using Airflow, dbt, Snowflake, and a Public API.",
  difficulty: "advanced", estimatedHours: 20, importance: "must-know", interviewWeight: 5,
  careerLevel: "junior", interviewImportance: 5, productionImportance: 5,
  interviewRecommendation: "Learn Deeply — this is the most standard DE architecture today",
  prerequisites: ["de-projects", "dbt-models", "airflow-dags"], learningObjectives: [
    "Extract data from a paginated REST API",
    "Load raw JSON to cloud storage (S3/GCS)",
    "Configure Airflow to orchestrate the pipeline",
    "Transform data using dbt (Bronze -> Silver -> Gold)"
  ],
  problemItSolves: "Proves to employers that you can stitch together the modern data stack (Airbyte/Custom Python -> S3 -> Snowflake -> dbt).",
  whyItExists: "This architecture represents 80% of data engineering jobs today.",
  realWorldUsage: "This is a simplified version of what you will build on your first week at a modern tech company.",
  theory: "## Project Architecture\n\n1. **Extract**: Python script calls the Reddit API (or Spotify/Weather).\n2. **Load**: Python saves raw JSON to AWS S3 (Bronze).\n3. **Ingest**: Snowflake external stage loads S3 data into a raw table.\n4. **Transform (Silver)**: dbt parses the JSON, casts data types, and removes duplicates.\n5. **Transform (Gold)**: dbt aggregates the data into a Star Schema (e.g., Daily Subreddit Stats).\n6. **Orchestrate**: Airflow runs this entire process every night at midnight.",
  resources: {
    docs: [], youtube: [], udemy: [], articles: []
  },
  miniProject: { title: "Batch Lakehouse", description: "Build the architecture described above using free-tier tools.", skills: ["Python", "Airflow", "dbt", "Snowflake", "S3"], estimatedHours: 20 },
  exercises: [],
  nextTopics: ["streaming-project"], previousTopics: ["de-projects"],
  commonMistakes: ["Leaving Snowflake running and getting a massive bill (Set auto-suspend to 1 minute!)"],
  interviewQuestions: ["Why did you choose dbt for transformation instead of doing it in Python?", "How does your pipeline handle API rate limits?"],
  flashcards: [],
  summary: "A batch lakehouse project demonstrates your ability to integrate Python, S3, a Data Warehouse, dbt, and Airflow into a cohesive, automated pipeline."
},
{
  id: "streaming-project", title: "Project: Real-Time Stream Processing", phase: "projects", phaseLabel: "Capstone Projects",
  description: "Build a real-time streaming pipeline using Kafka, Spark Structured Streaming, and a live data source.",
  difficulty: "advanced", estimatedHours: 25, importance: "good-to-know", interviewWeight: 4,
  careerLevel: "mid", interviewImportance: 4, productionImportance: 4,
  interviewRecommendation: "Learn Well — sets you apart from junior candidates",
  prerequisites: ["de-projects", "kafka-arch", "spark-dataframes"], learningObjectives: [
    "Produce messages to a Kafka Topic in real-time",
    "Consume messages using Spark Structured Streaming",
    "Perform windowed aggregations on streaming data",
    "Write streaming results to a database"
  ],
  problemItSolves: "Proves you understand distributed messaging and continuous compute, which are required for high-paying roles at tier-1 tech companies.",
  whyItExists: "While batch processing is common, streaming is hard. Building a streaming project proves you can handle complex distributed systems.",
  realWorldUsage: "Used to build live dashboards, fraud detection systems, or dynamic pricing algorithms.",
  theory: "## Project Architecture\n\n1. **Source**: A Python script connects to a WebSockets API (e.g., Binance Crypto Trades or Meetup RSVPs).\n2. **Ingest**: Python acts as a Kafka Producer, pushing events to a Kafka Topic.\n3. **Process**: A PySpark Structured Streaming job consumes the Kafka topic.\n4. **Transform**: Spark calculates a 1-minute Tumbling Window (e.g., Average Bitcoin price per minute).\n5. **Serve**: Spark writes the aggregated data to a fast database (e.g., Postgres or Redis).\n6. **Visualize**: Connect Grafana or Streamlit to the database for a live dashboard.",
  resources: {
    docs: [], youtube: [], udemy: [], articles: []
  },
  miniProject: { title: "Real-Time Crypto Dashboard", description: "Build the architecture described above using local Docker containers for Kafka and Spark.", skills: ["Kafka", "PySpark", "Docker", "Streaming"], estimatedHours: 25 },
  exercises: [],
  nextTopics: ["sys-design-intro"], previousTopics: ["batch-project"],
  commonMistakes: ["Trying to deploy a production Kafka cluster to AWS (too expensive). Run this locally using Docker Compose."],
  interviewQuestions: ["How did you handle late-arriving data in your Spark streaming job?", "Why Kafka instead of a standard database for ingestion?"],
  flashcards: [],
  summary: "A streaming project using Kafka and Spark Structured Streaming demonstrates advanced distributed systems knowledge and real-time processing skills."
},

// ═══════════════════════════════════════════════════════════════════
// SYSTEM DESIGN
// ═══════════════════════════════════════════════════════════════════
{
  id: "sys-design-intro", title: "System Design for DEs", phase: "system-design", phaseLabel: "System Design",
  description: "Understand what a Data Engineering System Design interview looks like and how to approach it.",
  difficulty: "advanced", estimatedHours: 2, importance: "must-know", interviewWeight: 5,
  careerLevel: "senior", interviewImportance: 5, productionImportance: 4,
  interviewRecommendation: "Learn Deeply — the most heavily weighted interview for Mid/Senior roles",
  prerequisites: ["batch-vs-streaming", "data-warehouse", "horizontal-scaling"], learningObjectives: [
    "Understand the difference between SWE System Design and DE System Design",
    "Learn the framework for approaching an open-ended design question",
    "Understand how to gather requirements"
  ],
  problemItSolves: "In interviews, you will be asked 'Design a system to process 10 billion events per day.' If you just start naming technologies, you will fail. You need a structured approach.",
  whyItExists: "Companies want to know if you can architect scalable, reliable systems, not just write code.",
  realWorldUsage: "This is exactly what Staff/Principal engineers do every day: translate business problems into technical architectures.",
  theory: "## DE System Design\n\n### SWE vs DE System Design\n- **Software Engineering**: Focuses on APIs, Load Balancers, Microservices, Caching (Redis), and OLTP databases.\n- **Data Engineering**: Focuses on Ingestion (Kafka/Airbyte), Storage (S3), Compute (Spark), Transformation (dbt), and Serving (Redshift/Druid).\n\n### The 4-Step Framework\n1. **Requirements Gathering**: (Never skip this!) What is the data volume? Latency requirements? Use cases?\n2. **High-Level Design**: Draw the boxes (Source -> Ingest -> Storage -> Compute -> Serving).\n3. **Deep Dive**: Justify technology choices (e.g., 'I chose Kafka over SQS because we need multiple consumers'). Discuss partitioning and data models.\n4. **Bottlenecks**: Identify what breaks when traffic 10x's and how to fix it.",
  resources: {
    docs: [], youtube: [], udemy: [], articles: []
  },
  miniProject: null, exercises: ["Write down 5 clarifying questions you would ask for the prompt 'Design a data pipeline for a ride-sharing app'"],
  nextTopics: ["sys-design-framework"], previousTopics: ["streaming-project"],
  commonMistakes: ["Jumping straight into drawing boxes without asking clarifying questions about data volume and latency requirements."],
  interviewQuestions: ["What are the most important clarifying questions to ask in a system design interview?"],
  flashcards: [
    { front: "What are the 4 steps of a System Design interview?", back: "1. Requirements Gathering (Volume, Velocity, Use Cases). 2. High-Level Design (The boxes). 3. Deep Dive (Tech choices, data models). 4. Bottlenecks (Scaling, fault tolerance)." }
  ],
  summary: "DE System Design focuses on moving and processing data at scale. Always start by gathering requirements (volume, latency) before designing the architecture."
},
{
  id: "sys-design-framework", title: "The 5-Layer DE Framework", phase: "system-design", phaseLabel: "System Design",
  description: "Master the 5-layer framework used to design any data architecture: Source, Ingestion, Storage, Processing, Serving.",
  difficulty: "advanced", estimatedHours: 3, importance: "must-know", interviewWeight: 5,
  careerLevel: "senior", interviewImportance: 5, productionImportance: 5,
  interviewRecommendation: "Learn Deeply — use this template for every interview",
  prerequisites: ["sys-design-intro"], learningObjectives: [
    "Memorize the 5 layers of data architecture",
    "Map AWS/GCP/Open-Source technologies to each layer",
    "Identify tradeoffs between different tools in the same layer"
  ],
  problemItSolves: "Provides a mental model so you never get stuck during a whiteboard interview. If you fill out all 5 layers, you have a complete architecture.",
  whyItExists: "Abstracting systems into layers allows you to swap components (e.g., swapping Airbyte for Kafka in the ingestion layer) based on the specific requirements of the interview prompt.",
  realWorldUsage: "This is the blueprint for almost every modern data platform.",
  theory: "## The 5-Layer Framework\n\n1. **Source**: Where does data come from? (Postgres OLTP, Web APIs, Mobile App Events).\n2. **Ingestion**: How does data enter our system?\n   - Batch: Airbyte, Fivetran, custom Python scripts.\n   - Streaming: Kafka, Kinesis, Pub/Sub.\n3. **Storage**: Where does raw data live?\n   - Data Lake: AWS S3, GCS, Azure Data Lake.\n4. **Processing**: How do we clean and transform it?\n   - Batch Heavy: Apache Spark, Databricks.\n   - SQL Heavy: dbt inside Snowflake/BigQuery.\n   - Stream Heavy: Apache Flink, Kafka Streams.\n5. **Serving**: Where do analysts query it?\n   - Dashboards: Redshift, Snowflake, BigQuery.\n   - Ultra-fast apps: Apache Druid, ClickHouse, Redis.\n\n*(Plus Orchestration wrapping everything: Airflow, Dagster)*",
  resources: {
    docs: [], youtube: [], udemy: [], articles: []
  },
  miniProject: null, exercises: ["Map the Modern Data Stack tools (dbt, Snowflake, Fivetran, Airflow) to the 5 layers"],
  nextTopics: ["design-youtube"], previousTopics: ["sys-design-intro"],
  commonMistakes: ["Mixing up the Processing layer and the Serving layer. (e.g., Spark processes the data, but you wouldn't connect Tableau directly to Spark; you'd connect it to Snowflake)."],
  interviewQuestions: ["Design a system where users upload images and we need to run ML models to classify them."],
  flashcards: [
    { front: "What are the 5 layers of a data architecture?", back: "1. Source (Databases/APIs). 2. Ingestion (Kafka/Fivetran). 3. Storage (S3/Data Lake). 4. Processing (Spark/dbt). 5. Serving (Snowflake/Redshift)." }
  ],
  summary: "Use the 5-layer framework (Source, Ingestion, Storage, Processing, Serving) to structure your thoughts during any system design interview."
},

// ═══════════════════════════════════════════════════════════════════
// INTERVIEW PREP
// ═══════════════════════════════════════════════════════════════════
{
  id: "sql-interview", title: "SQL Interview Prep", phase: "interview", phaseLabel: "Interview Prep",
  description: "Prepare for the most common SQL interview questions — LeetCode Mediums, Window Functions, and optimization.",
  difficulty: "intermediate", estimatedHours: 5, importance: "must-know", interviewWeight: 5,
  careerLevel: "foundation", interviewImportance: 5, productionImportance: 5,
  interviewRecommendation: "Learn Deeply — the easiest way to fail an interview is failing the SQL screen",
  prerequisites: ["sql"], learningObjectives: [
    "Solve top LeetCode/StrataScratch SQL questions",
    "Master Gaps & Islands problems",
    "Master consecutive logins / retention problems"
  ],
  problemItSolves: "You might know SQL, but interview SQL is a specific genre of puzzle. You must practice the patterns.",
  whyItExists: "SQL screens are cheap and highly predictive of a candidate's baseline data manipulation ability.",
  realWorldUsage: "These complex analytical queries translate directly to writing dbt models.",
  theory: "## SQL Interview Patterns\n\n### The 'Consecutive Events' Pattern\n(e.g., Find users who logged in 3 days in a row).\n**Solution**: Use `LEAD()` or `LAG()` to look at the next/previous row, or use a Self-Join.\n\n### The 'Gaps and Islands' Pattern\n(e.g., Group continuous periods of activity).\n**Solution**: Use `ROW_NUMBER()`. If you subtract `ROW_NUMBER()` from a `Date`, all continuous dates will yield the same constant value! You can then group by that constant.\n\n### The 'Top N per Category' Pattern\n(e.g., Find the top 3 highest paid employees in each department).\n**Solution**: Use `DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC)`. Then wrap in a CTE and filter `WHERE rank <= 3`.",
  resources: {
    docs: [],
    youtube: [],
    udemy: [],
    articles: [{ title: "StrataScratch SQL Questions", url: "https://www.stratascratch.com/" }]
  },
  miniProject: null, exercises: ["Solve 10 LeetCode Medium SQL questions without looking at the solution"],
  nextTopics: ["python-interview"], previousTopics: ["sys-design-framework"],
  commonMistakes: ["Using `RANK()` when they should use `DENSE_RANK()` (Rank skips numbers if there's a tie, Dense Rank does not)."],
  interviewQuestions: ["Find the 3rd highest salary.", "Write a query to calculate the 7-day rolling average of sales.", "Find the percentage of users who logged in on consecutive days."],
  flashcards: [
    { front: "RANK vs DENSE_RANK?", back: "If there's a tie for 1st place: RANK() gives 1, 1, 3. DENSE_RANK() gives 1, 1, 2. (Dense rank does not skip numbers)." }
  ],
  summary: "SQL interviews focus heavily on Window Functions. Master CTEs, LEAD/LAG, and the 'Top N per category' patterns."
},
{
  id: "python-interview", title: "Python/DSA Interview Prep", phase: "interview", phaseLabel: "Interview Prep",
  description: "Prepare for Python coding rounds — LeetCode Easy/Mediums, string manipulation, and dictionaries.",
  difficulty: "intermediate", estimatedHours: 5, importance: "must-know", interviewWeight: 4,
  careerLevel: "foundation", interviewImportance: 4, productionImportance: 3,
  interviewRecommendation: "Learn Well — Data Engineers are tested on SWE basics",
  prerequisites: ["python"], learningObjectives: [
    "Solve common string and array manipulation problems",
    "Master the use of Hash Maps (Dictionaries)",
    "Understand Big O Notation (Time/Space Complexity)"
  ],
  problemItSolves: "Many companies (especially FAANG) use the same coding screens for Data Engineers as they do for Software Engineers.",
  whyItExists: "Coding tests prove you can write clean, efficient logic and handle edge cases.",
  realWorldUsage: "Writing custom API extractors, complex Airflow logic, or PySpark UDFs.",
  theory: "## Python Interview Prep\n\n### Big O Notation\n- **O(1)**: Constant time (e.g., looking up a key in a dictionary).\n- **O(N)**: Linear time (e.g., iterating through a list).\n- **O(N^2)**: Quadratic time (e.g., a nested for loop). **Avoid this!**\n\n### The Hash Map (Dictionary) Trick\n90% of Data Engineering Python interview problems (like Two Sum, counting frequencies, grouping anagrams) can be optimized from O(N^2) down to O(N) by using a Python Dictionary to store data for O(1) lookups.",
  resources: {
    docs: [], youtube: [], udemy: [], articles: []
  },
  miniProject: null, exercises: ["Solve 'Two Sum' and 'Valid Anagram' on LeetCode"],
  nextTopics: ["behavioral-interview"], previousTopics: ["sql-interview"],
  commonMistakes: ["Using nested for-loops (O(N^2)) instead of a Dictionary (O(N))", "Modifying a list while iterating over it"],
  interviewQuestions: ["Write a function to check if a string is a palindrome.", "Merge two overlapping intervals."],
  flashcards: [
    { front: "What is the time complexity of looking up a value in a List vs a Dictionary?", back: "List: O(N) - Python has to check every element. Dictionary: O(1) - Python uses a hash function to instantly find the value." }
  ],
  summary: "Python interviews for DEs focus on string manipulation, arrays, and dictionaries. Always look to optimize nested loops using a hash map."
},
{
  id: "behavioral-interview", title: "Behavioral & STAR Method", phase: "interview", phaseLabel: "Interview Prep",
  description: "Learn how to pass the behavioral interview using the STAR method.",
  difficulty: "beginner", estimatedHours: 2, importance: "must-know", interviewWeight: 4,
  careerLevel: "foundation", interviewImportance: 4, productionImportance: 1,
  interviewRecommendation: "Learn Well — this determines cultural fit and level mapping",
  prerequisites: [], learningObjectives: [
    "Structure answers using the STAR method",
    "Prepare stories for common behavioral questions",
    "Learn how to talk about failures positively"
  ],
  problemItSolves: "Candidates often ramble or forget to mention their specific impact when asked 'Tell me about a time...'. STAR keeps answers concise and impactful.",
  whyItExists: "Companies want to know if you are easy to work with, how you handle conflict, and if you can communicate technical concepts to non-technical stakeholders.",
  realWorldUsage: "Crucial for everyday collaboration with product managers, analysts, and other engineers.",
  theory: "## The STAR Method\n\nWhen asked a behavioral question, structure your answer exactly like this:\n\n1. **Situation (10%)**: Set the scene. \"We had a legacy ETL pipeline that took 12 hours to run.\"\n2. **Task (10%)**: What was your responsibility? \"I was tasked with reducing the runtime so analysts had data by 8 AM.\"\n3. **Action (60%)**: What did YOU specifically do? (Use 'I', not 'We'). \"I profiled the pipeline, identified a massive shuffle in Spark, and refactored the code to use a broadcast join.\"\n4. **Result (20%)**: What was the outcome? Use numbers! \"The pipeline runtime dropped from 12 hours to 2 hours, saving $1,500/month in cloud compute.\"",
  resources: {
    docs: [], youtube: [], udemy: [], articles: []
  },
  miniProject: null, exercises: ["Write out 3 STAR stories from your past experience (or portfolio projects)"],
  nextTopics: ["resume-prep"], previousTopics: ["python-interview"],
  commonMistakes: ["Using 'We' instead of 'I' (the interviewer wants to know what YOU did, not your team)", "Forgetting the 'Result' part"],
  interviewQuestions: ["Tell me about a time you failed.", "Tell me about a time you had a conflict with a coworker.", "Describe a time you had to learn a new technology quickly."],
  flashcards: [
    { front: "What does the STAR method stand for?", back: "Situation, Task, Action, Result. Used to structure behavioral interview answers." }
  ],
  summary: "Use the STAR method (Situation, Task, Action, Result) to structure your behavioral answers. Focus heavily on the 'Action' and use metrics for the 'Result'."
}

];

existingModules.push(...newModules);
fs.writeFileSync('src/data/modules.json', JSON.stringify(existingModules, null, 2));
console.log(`Phase 11: Added ${newModules.length} modules (Projects + Interview Prep)`);
