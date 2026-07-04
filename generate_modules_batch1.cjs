const fs = require('fs');

// ═══════════════════════════════════════════════════════════════════
// DEOS Module Generator — 150+ modules with full content
// ═══════════════════════════════════════════════════════════════════

const modules = [

// ═══════════════════════════════════════════════════════════════════
// FOUNDATIONS
// ═══════════════════════════════════════════════════════════════════
{
  id: "python", title: "Python for Data Engineering", phase: "foundation", phaseLabel: "Foundations",
  description: "Master Python fundamentals essential for data engineering — data structures, file I/O, error handling, virtual environments, and writing production-quality scripts.",
  difficulty: "beginner", estimatedHours: 20, importance: "must-know", interviewWeight: 5,
  careerLevel: "foundation", interviewImportance: 5, productionImportance: 5,
  interviewRecommendation: "Learn Deeply — Python is asked in every DE interview",
  prerequisites: [], learningObjectives: [
    "Write production-quality Python scripts for data processing",
    "Use list/dict comprehensions, generators, and decorators effectively",
    "Handle files (CSV, JSON, Parquet) with standard libraries",
    "Manage dependencies with pip and virtual environments",
    "Write unit tests for data pipelines"
  ],
  problemItSolves: "Data engineering requires automation — manually moving and transforming data doesn't scale. Python provides the glue language that connects every tool in the modern data stack.",
  whyItExists: "Python became the dominant language in data engineering because of its readability, vast ecosystem (pandas, PySpark, Airflow, dbt), and gentle learning curve. Almost every major data tool has a Python SDK.",
  realWorldUsage: "At Uber, Python is used to build ETL scripts, orchestrate Airflow DAGs, write PySpark jobs, and create data quality checks. At Spotify, Python powers their data pipelines processing billions of events daily.",
  theory: "## Python for Data Engineers\n\n### Core Concepts\n\n**Data Structures**: Lists, dictionaries, sets, and tuples are your bread and butter. Understand when to use each:\n- Lists for ordered, mutable sequences\n- Dicts for key-value lookups (O(1) average)\n- Sets for unique elements and fast membership testing\n- Tuples for immutable records\n\n### File I/O\n```python\nimport csv\nimport json\n\n# Read CSV\nwith open('data.csv') as f:\n    reader = csv.DictReader(f)\n    for row in reader:\n        process(row)\n\n# Read JSON\nwith open('config.json') as f:\n    config = json.load(f)\n```\n\n### Generators for Large Datasets\n```python\ndef read_large_file(path):\n    with open(path) as f:\n        for line in f:\n            yield json.loads(line)\n```\n\n### Error Handling\n```python\ntry:\n    result = transform(data)\nexcept ValueError as e:\n    logger.error(f'Transform failed: {e}')\n    raise\nfinally:\n    cleanup()\n```\n\n### Virtual Environments\n```bash\npython -m venv .venv\nsource .venv/bin/activate  # Linux/Mac\npip install -r requirements.txt\n```",
  resources: {
    docs: [{ title: "Python Official Documentation", url: "https://docs.python.org/3/" }],
    youtube: [{ title: "Python for Data Engineering - Full Course", url: "https://www.youtube.com/watch?v=cJGwnRPTxLQ", duration: "4h" }],
    udemy: [{ title: "Complete Python Bootcamp", url: "https://www.udemy.com/course/complete-python-bootcamp/", author: "Jose Portilla" }],
    articles: [{ title: "Functional Data Engineering — A Modern Paradigm", url: "https://maximebeauchemin.medium.com/functional-data-engineering-a-modern-paradigm-for-batch-data-processing-2327ec32c42a" }]
  },
  miniProject: { title: "CSV to JSON Pipeline", description: "Build a Python script that reads raw CSV sales data, validates and cleans it, transforms it into a normalized JSON format, and writes the output. Include error handling, logging, and unit tests.", skills: ["Python", "File I/O", "Error Handling", "Testing"], estimatedHours: 3 },
  exercises: ["Write a generator that reads a 1GB CSV file line by line without loading it into memory", "Create a decorator that logs function execution time", "Build a data validation function using dataclasses", "Write unit tests for a data transformation function"],
  nextTopics: ["sql", "git", "linux"], previousTopics: [],
  commonMistakes: ["Loading entire large files into memory instead of streaming", "Not using virtual environments leading to dependency conflicts", "Ignoring error handling in production scripts", "Writing monolithic scripts instead of modular functions"],
  interviewQuestions: ["What is the difference between a list and a generator in Python?", "How would you process a 10GB CSV file in Python?", "Explain decorators and give a use case in data engineering", "What is the GIL and how does it affect data processing?", "How do you handle dependencies in a production Python project?"],
  flashcards: [
    { front: "What is a generator in Python?", back: "A function that yields values lazily using the 'yield' keyword, allowing you to iterate over large datasets without loading everything into memory." },
    { front: "List vs Tuple — when to use which?", back: "Lists are mutable and used for collections that change. Tuples are immutable, faster, and used for fixed records like (name, age, email)." },
    { front: "What does *args and **kwargs do?", back: "*args collects positional arguments as a tuple. **kwargs collects keyword arguments as a dictionary. Used for flexible function signatures." },
    { front: "What is a context manager?", back: "An object implementing __enter__ and __exit__ methods, used with 'with' statements for resource management (file handles, DB connections)." }
  ],
  summary: "Python is the foundation of modern data engineering. Master file I/O, generators for large data, error handling, and testing. Every tool in the data stack — Spark, Airflow, dbt — uses Python."
},

{
  id: "sql", title: "Advanced SQL", phase: "foundation", phaseLabel: "Foundations",
  description: "Master advanced SQL including window functions, CTEs, subqueries, indexing strategies, and query optimization — the most tested skill in DE interviews.",
  difficulty: "beginner", estimatedHours: 25, importance: "must-know", interviewWeight: 5,
  careerLevel: "foundation", interviewImportance: 5, productionImportance: 5,
  interviewRecommendation: "Learn Deeply — SQL is the #1 tested skill in every DE interview",
  prerequisites: [], learningObjectives: [
    "Write complex queries with JOINs, subqueries, and CTEs",
    "Use window functions (ROW_NUMBER, RANK, LAG, LEAD, SUM OVER)",
    "Optimize queries using EXPLAIN plans and indexing",
    "Understand transaction isolation levels and locking",
    "Write analytical queries for business reporting"
  ],
  problemItSolves: "Data is stored in relational databases. SQL is the universal language to query, transform, and analyze that data. Without SQL, you cannot interact with 90% of production data systems.",
  whyItExists: "SQL was created in the 1970s to provide a declarative way to query relational data. It remains the most important skill for data professionals because almost every data system (Spark SQL, BigQuery, Redshift, Athena) supports SQL.",
  realWorldUsage: "At Amazon, SQL is used in Redshift for warehouse queries, in Athena for ad-hoc analysis, and in Spark SQL for batch processing. SQL is the #1 skill tested in DE interviews at every major company.",
  theory: "## Advanced SQL for Data Engineers\n\n### Window Functions\n```sql\nSELECT \n  user_id,\n  order_date,\n  amount,\n  SUM(amount) OVER (PARTITION BY user_id ORDER BY order_date) as running_total,\n  ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY order_date DESC) as rn,\n  LAG(amount) OVER (PARTITION BY user_id ORDER BY order_date) as prev_amount\nFROM orders;\n```\n\n### Common Table Expressions (CTEs)\n```sql\nWITH daily_revenue AS (\n  SELECT DATE(created_at) as day, SUM(amount) as revenue\n  FROM orders\n  GROUP BY DATE(created_at)\n),\nrevenue_with_growth AS (\n  SELECT day, revenue,\n    LAG(revenue) OVER (ORDER BY day) as prev_day_revenue,\n    revenue - LAG(revenue) OVER (ORDER BY day) as growth\n  FROM daily_revenue\n)\nSELECT * FROM revenue_with_growth;\n```\n\n### Query Optimization\n- Always check EXPLAIN ANALYZE\n- Use appropriate indexes (B-tree for equality, GiST for ranges)\n- Avoid SELECT * in production\n- Use LIMIT for exploratory queries",
  resources: {
    docs: [{ title: "PostgreSQL Documentation", url: "https://www.postgresql.org/docs/current/" }],
    youtube: [{ title: "Advanced SQL Tutorial - Window Functions", url: "https://www.youtube.com/watch?v=Ww71knvhQ-s", duration: "3h" }],
    udemy: [{ title: "The Complete SQL Bootcamp", url: "https://www.udemy.com/course/the-complete-sql-bootcamp/", author: "Jose Portilla" }],
    articles: [{ title: "Use The Index, Luke! - SQL Indexing and Tuning", url: "https://use-the-index-luke.com/" }]
  },
  miniProject: { title: "E-Commerce Analytics Dashboard Queries", description: "Write 10 advanced SQL queries for an e-commerce database: customer lifetime value, cohort analysis, funnel conversion, product affinity, and revenue forecasting using window functions and CTEs.", skills: ["SQL", "Window Functions", "CTEs", "Analytics"], estimatedHours: 4 },
  exercises: ["Write a query to find the top 3 products per category by revenue using RANK()", "Create a cohort retention analysis using date functions and window functions", "Optimize a slow query using EXPLAIN ANALYZE and add appropriate indexes", "Write a recursive CTE to flatten a hierarchical category tree"],
  nextTopics: ["git", "linux", "what-is-de"], previousTopics: [],
  commonMistakes: ["Using correlated subqueries when a JOIN would be faster", "Not understanding NULL behavior in aggregations", "Forgetting to add indexes on JOIN and WHERE columns", "Using DISTINCT to mask duplicate data instead of fixing the root cause"],
  interviewQuestions: ["Explain the difference between ROW_NUMBER, RANK, and DENSE_RANK", "How would you find duplicate records in a table?", "What is the difference between WHERE and HAVING?", "Explain the order of SQL query execution", "How would you optimize a query that takes 30 seconds?"],
  flashcards: [
    { front: "What is a window function?", back: "A function that performs calculations across a set of rows related to the current row, without collapsing them into a single output row like GROUP BY does." },
    { front: "CTE vs Subquery — when to use which?", back: "CTEs are more readable and reusable within a query. Subqueries are useful for simple, one-off filters. CTEs can be recursive; subqueries cannot." },
    { front: "What does EXPLAIN ANALYZE do?", back: "Shows the actual execution plan of a query including estimated vs actual row counts, join strategies, and index usage. Essential for query optimization." },
    { front: "INNER JOIN vs LEFT JOIN?", back: "INNER JOIN returns only matching rows. LEFT JOIN returns all rows from the left table plus matching rows from the right (NULLs where no match)." }
  ],
  summary: "SQL is the single most important skill for a data engineer. Master window functions, CTEs, query optimization, and indexing. Every interview will test your SQL ability."
},

{
  id: "git", title: "Git & Version Control", phase: "foundation", phaseLabel: "Foundations",
  description: "Learn Git for collaborative data engineering — branching strategies, pull requests, conflict resolution, and CI/CD workflows.",
  difficulty: "beginner", estimatedHours: 6, importance: "must-know", interviewWeight: 2,
  careerLevel: "foundation", interviewImportance: 2, productionImportance: 4,
  interviewRecommendation: "Know Concept — rarely asked directly but essential for production work",
  prerequisites: [], learningObjectives: [
    "Initialize repos, commit, branch, and merge",
    "Use pull requests and code reviews effectively",
    "Resolve merge conflicts",
    "Understand Git flow and trunk-based development",
    "Use .gitignore for data engineering projects"
  ],
  problemItSolves: "Without version control, teams overwrite each other's work, there's no history of changes, and rolling back broken deployments is impossible.",
  whyItExists: "Git was created by Linus Torvalds in 2005 to manage the Linux kernel. It became the standard for all software development because it enables distributed collaboration, change tracking, and safe experimentation via branches.",
  realWorldUsage: "Every data team at companies like Microsoft, Flipkart, and Razorpay uses Git for pipeline code, dbt models, Airflow DAGs, and infrastructure-as-code. Code reviews via pull requests catch bugs before they reach production.",
  theory: "## Git for Data Engineers\n\n### Essential Commands\n```bash\ngit init\ngit add .\ngit commit -m 'Add ETL pipeline for user events'\ngit branch feature/new-pipeline\ngit checkout feature/new-pipeline\ngit push origin feature/new-pipeline\n```\n\n### Branching Strategy\n- **main**: Production-ready code\n- **develop**: Integration branch\n- **feature/xyz**: Individual features\n- **hotfix/xyz**: Emergency fixes\n\n### .gitignore for DE Projects\n```\n*.csv\n*.parquet\n.env\n__pycache__/\n.venv/\n```",
  resources: {
    docs: [{ title: "Git Official Documentation", url: "https://git-scm.com/doc" }],
    youtube: [{ title: "Git and GitHub for Beginners", url: "https://www.youtube.com/watch?v=RGOj5yH7evk", duration: "1h" }],
    udemy: [],
    articles: [{ title: "Atlassian Git Tutorial", url: "https://www.atlassian.com/git/tutorials" }]
  },
  miniProject: null,
  exercises: ["Create a repository, make 3 branches, and practice merging with conflicts", "Set up a .gitignore for a data engineering project", "Practice interactive rebase to clean up commit history"],
  nextTopics: ["what-is-de"], previousTopics: [],
  commonMistakes: ["Committing sensitive data (passwords, API keys)", "Making huge commits instead of small, atomic ones", "Not writing meaningful commit messages"],
  interviewQuestions: ["What is the difference between git merge and git rebase?", "How do you resolve a merge conflict?", "What is a pull request and why is it important?"],
  flashcards: [
    { front: "git merge vs git rebase?", back: "Merge creates a merge commit preserving history. Rebase replays commits on top of another branch for a linear history. Use merge for shared branches, rebase for personal branches." },
    { front: "What is .gitignore?", back: "A file that tells Git which files/directories to ignore. In DE projects: .env, *.csv, *.parquet, __pycache__/, .venv/" }
  ],
  summary: "Git is essential for team collaboration. Learn branching, merging, pull requests, and how to structure a data engineering repository."
},

{
  id: "linux", title: "Linux & Command Line", phase: "foundation", phaseLabel: "Foundations",
  description: "Master Linux fundamentals — file system navigation, process management, shell scripting, and SSH — essential for working with production servers and cloud environments.",
  difficulty: "beginner", estimatedHours: 8, importance: "must-know", interviewWeight: 2,
  careerLevel: "foundation", interviewImportance: 2, productionImportance: 4,
  interviewRecommendation: "Know Concept — basic commands are expected knowledge",
  prerequisites: [], learningObjectives: [
    "Navigate the Linux file system and manage files",
    "Use pipes, grep, awk, sed for data processing",
    "Write basic shell scripts for automation",
    "Manage processes and monitor system resources",
    "Use SSH for remote server access"
  ],
  problemItSolves: "Production data systems run on Linux servers. Without command-line skills, you cannot deploy, debug, or monitor data pipelines in production environments.",
  whyItExists: "Linux is the operating system that powers 90%+ of production servers, cloud instances, and containers. Understanding the command line is essential for any data engineer working with AWS, Docker, or Kubernetes.",
  realWorldUsage: "At every company, data engineers SSH into servers to debug failing pipelines, use grep to search logs, write cron jobs for scheduling, and use shell scripts for deployment automation.",
  theory: "## Linux Essentials for Data Engineers\n\n### File Operations\n```bash\nls -la          # List files with details\nfind . -name '*.parquet' -mtime -7  # Find recent files\ndu -sh data/    # Disk usage\nwc -l data.csv  # Count lines\n```\n\n### Text Processing Pipeline\n```bash\ncat access.log | grep 'ERROR' | awk '{print $4}' | sort | uniq -c | sort -rn | head -10\n```\n\n### Process Management\n```bash\nps aux | grep spark\nkill -9 <PID>\nnohup python pipeline.py &\n```\n\n### SSH\n```bash\nssh -i key.pem user@server\nscp file.py user@server:/home/user/\n```",
  resources: {
    docs: [{ title: "Linux Command Line Basics", url: "https://ubuntu.com/tutorials/command-line-for-beginners" }],
    youtube: [{ title: "Linux for Data Engineers", url: "https://www.youtube.com/watch?v=ZtqBQ68cfJc", duration: "2h" }],
    udemy: [],
    articles: [{ title: "The Art of Command Line", url: "https://github.com/jlevy/the-art-of-command-line" }]
  },
  miniProject: null,
  exercises: ["Write a shell script that processes a CSV file and extracts the top 10 values", "Use find and grep to search for specific patterns across a project", "Set up SSH keys for passwordless authentication"],
  nextTopics: ["what-is-de"], previousTopics: [],
  commonMistakes: ["Running rm -rf without checking the path first", "Not understanding file permissions (chmod)", "Ignoring disk space monitoring on data servers"],
  interviewQuestions: ["How would you find all files larger than 100MB?", "Explain the pipe operator in Linux", "How do you monitor disk usage on a server?"],
  flashcards: [
    { front: "What does chmod 755 mean?", back: "Owner can read/write/execute (7), group can read/execute (5), others can read/execute (5). Common for scripts." },
    { front: "How to find files containing a string?", back: "grep -r 'search_term' /path/to/dir — recursively searches all files in the directory." }
  ],
  summary: "Linux command-line skills are non-negotiable for data engineers. Learn file operations, text processing with pipes, process management, and SSH."
},

{
  id: "rest-apis", title: "REST APIs & JSON", phase: "foundation", phaseLabel: "Foundations",
  description: "Understand REST APIs, HTTP methods, authentication, and JSON data interchange — the standard way data systems communicate.",
  difficulty: "beginner", estimatedHours: 6, importance: "good-to-know", interviewWeight: 2,
  careerLevel: "foundation", interviewImportance: 2, productionImportance: 3,
  interviewRecommendation: "Know Concept — understand how APIs work for data ingestion",
  prerequisites: ["python"], learningObjectives: [
    "Understand HTTP methods (GET, POST, PUT, DELETE)",
    "Make API calls using Python requests library",
    "Handle authentication (API keys, OAuth, tokens)",
    "Parse and validate JSON responses",
    "Implement pagination and rate limiting"
  ],
  problemItSolves: "Most data sources expose their data through APIs, not database connections. Without understanding APIs, you cannot ingest data from SaaS tools, third-party services, or internal microservices.",
  whyItExists: "REST APIs provide a standardized way for systems to communicate over HTTP. JSON became the universal data interchange format because it's human-readable and natively supported by JavaScript and Python.",
  realWorldUsage: "Data engineers at PhonePe extract transaction data via internal APIs, ingest Salesforce data through REST endpoints, and build API-based data ingestion pipelines that pull data from hundreds of microservices.",
  theory: "## REST APIs for Data Engineers\n\n### HTTP Methods\n- **GET**: Retrieve data\n- **POST**: Create data\n- **PUT**: Update data\n- **DELETE**: Remove data\n\n### Making API Calls in Python\n```python\nimport requests\n\nresponse = requests.get(\n    'https://api.example.com/users',\n    headers={'Authorization': 'Bearer TOKEN'},\n    params={'page': 1, 'limit': 100}\n)\ndata = response.json()\n```\n\n### Handling Pagination\n```python\ndef fetch_all_records(base_url):\n    records = []\n    page = 1\n    while True:\n        resp = requests.get(f'{base_url}?page={page}')\n        data = resp.json()\n        if not data['results']:\n            break\n        records.extend(data['results'])\n        page += 1\n    return records\n```",
  resources: {
    docs: [{ title: "MDN Web Docs - HTTP", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP" }],
    youtube: [{ title: "APIs for Beginners", url: "https://www.youtube.com/watch?v=GZvSYJDk-us", duration: "2h" }],
    udemy: [],
    articles: [{ title: "RESTful API Design Best Practices", url: "https://restfulapi.net/" }]
  },
  miniProject: { title: "API Data Ingestion Pipeline", description: "Build a Python pipeline that extracts data from a public API (e.g., GitHub, weather), handles pagination and rate limiting, and writes the results to JSON files.", skills: ["Python", "REST APIs", "JSON", "Error Handling"], estimatedHours: 2 },
  exercises: ["Make GET requests to a public API and parse the JSON response", "Implement exponential backoff for rate-limited APIs", "Build a simple API client class with authentication"],
  nextTopics: ["what-is-de"], previousTopics: ["python"],
  commonMistakes: ["Not handling API rate limits causing bans", "Ignoring HTTP status codes", "Hardcoding API keys in source code instead of using environment variables"],
  interviewQuestions: ["What is the difference between GET and POST?", "How do you handle pagination in API data extraction?", "What is idempotency in REST APIs?"],
  flashcards: [
    { front: "What is REST?", back: "Representational State Transfer — an architectural style using HTTP methods (GET, POST, PUT, DELETE) to interact with resources identified by URLs." },
    { front: "What is an API rate limit?", back: "A restriction on the number of API calls allowed in a time period. Exceeding it returns HTTP 429. Handle with exponential backoff." }
  ],
  summary: "REST APIs are the primary way to ingest data from external systems. Learn HTTP methods, authentication, pagination, and rate limiting."
},

// ═══════════════════════════════════════════════════════════════════
// MODERN DATA ENGINEERING CONCEPTS
// ═══════════════════════════════════════════════════════════════════
{
  id: "what-is-de", title: "What is Data Engineering?", phase: "concepts", phaseLabel: "Modern DE Concepts",
  description: "Understand the data engineering discipline — what data engineers do, how they differ from data scientists, and where they fit in the modern data organization.",
  difficulty: "beginner", estimatedHours: 3, importance: "must-know", interviewWeight: 3,
  careerLevel: "foundation", interviewImportance: 3, productionImportance: 2,
  interviewRecommendation: "Learn Enough — understand the role and ecosystem",
  prerequisites: ["python", "sql"], learningObjectives: [
    "Define data engineering and its core responsibilities",
    "Distinguish DE from Data Science, Analytics, and ML Engineering",
    "Understand the data engineering lifecycle",
    "Map the modern data stack tools to their functions"
  ],
  problemItSolves: "Organizations collect massive amounts of data but can't use it without reliable infrastructure. Data engineers build the pipelines that make data available, reliable, and usable for analysts and scientists.",
  whyItExists: "As data volumes exploded, organizations needed specialized engineers to build and maintain the infrastructure that collects, stores, transforms, and serves data. This role emerged from the intersection of software engineering and database administration.",
  realWorldUsage: "At Swiggy, data engineers build pipelines that process 100M+ daily orders, powering real-time dashboards, ML models for delivery time prediction, and business analytics for restaurant partners.",
  theory: "## What is Data Engineering?\n\nData engineering is the practice of designing, building, and maintaining systems that collect, store, and transform data to make it available for analysis and decision-making.\n\n### The Data Engineering Lifecycle\n1. **Generation** — Data is created (user clicks, transactions, IoT sensors)\n2. **Ingestion** — Data is collected into storage systems\n3. **Storage** — Data is stored in appropriate systems (lakes, warehouses)\n4. **Transformation** — Raw data is cleaned and modeled\n5. **Serving** — Transformed data is made available to consumers\n\n### DE vs Related Roles\n| Role | Focus |\n|------|-------|\n| Data Engineer | Build infrastructure and pipelines |\n| Data Analyst | Query data, create reports |\n| Data Scientist | Build ML models |\n| Analytics Engineer | Transform data with dbt |\n| ML Engineer | Deploy ML models to production |",
  resources: {
    docs: [{ title: "Fundamentals of Data Engineering (O'Reilly)", url: "https://www.oreilly.com/library/view/fundamentals-of-data/9781098108298/" }],
    youtube: [{ title: "What is Data Engineering?", url: "https://www.youtube.com/watch?v=qWru-b6m030", duration: "15m" }],
    udemy: [],
    articles: [{ title: "The Rise of the Data Engineer", url: "https://medium.com/free-code-camp/the-rise-of-the-data-engineer-91be18f1e603" }]
  },
  miniProject: null,
  exercises: ["Map 10 tools in the modern data stack to their lifecycle stage", "Write a 1-page summary of what a Data Engineer does at a product company"],
  nextTopics: ["role-of-de", "batch-vs-streaming", "etl-vs-elt"], previousTopics: ["python", "sql"],
  commonMistakes: ["Confusing data engineering with data science", "Thinking DE is just writing SQL queries", "Underestimating the software engineering aspects of the role"],
  interviewQuestions: ["What does a data engineer do?", "How is data engineering different from data science?", "What is the data engineering lifecycle?"],
  flashcards: [
    { front: "What is data engineering?", back: "The practice of designing, building, and maintaining systems that collect, store, transform, and serve data for analysis and decision-making." },
    { front: "Data Engineer vs Data Scientist?", back: "DEs build infrastructure and pipelines. DSs build ML models. DEs focus on reliability and scale. DSs focus on accuracy and insights." }
  ],
  summary: "Data engineering is about building reliable, scalable data infrastructure. Understand the lifecycle: generation → ingestion → storage → transformation → serving."
},

{
  id: "role-of-de", title: "Role of a Data Engineer", phase: "concepts", phaseLabel: "Modern DE Concepts",
  description: "Deep dive into the day-to-day responsibilities, skills, career path, and organizational context of a modern data engineer.",
  difficulty: "beginner", estimatedHours: 2, importance: "good-to-know", interviewWeight: 2,
  careerLevel: "foundation", interviewImportance: 2, productionImportance: 2,
  interviewRecommendation: "Know Concept — helpful for behavioral interviews",
  prerequisites: ["what-is-de"], learningObjectives: [
    "Understand daily responsibilities of a DE at different company sizes",
    "Know the career progression path (Junior → Senior → Staff → Principal)",
    "Identify key skills and technologies at each career level"
  ],
  problemItSolves: "Understanding the role helps you focus your learning on what actually matters for getting hired and succeeding in the job.",
  whyItExists: "The DE role varies significantly between companies. At startups, you might be the only data person. At FAANG, you're part of a specialized team. Understanding these variations helps you target your career.",
  realWorldUsage: "At Meesho (startup-scale), a DE might handle everything from setting up the data warehouse to building dashboards. At Microsoft, a DE focuses deeply on one area like streaming pipelines or data modeling.",
  theory: "## Role of a Modern Data Engineer\n\n### Daily Responsibilities\n- Design and build data pipelines\n- Monitor pipeline health and fix failures\n- Optimize query performance\n- Collaborate with analysts and scientists\n- Write documentation and data contracts\n\n### Career Progression\n1. **Junior DE** — Write ETL scripts, fix bugs, learn the stack\n2. **Mid-Level DE** — Own pipelines end-to-end, mentor juniors\n3. **Senior DE** — Design systems, set standards, lead projects\n4. **Staff/Principal** — Architecture decisions, cross-team impact",
  resources: {
    docs: [],
    youtube: [{ title: "Day in the Life of a Data Engineer", url: "https://www.youtube.com/watch?v=6RVzr-5VfHw", duration: "20m" }],
    udemy: [],
    articles: [{ title: "The Rise of the Data Engineer", url: "https://medium.com/free-code-camp/the-rise-of-the-data-engineer-91be18f1e603" }]
  },
  miniProject: null, exercises: [],
  nextTopics: ["batch-vs-streaming"], previousTopics: ["what-is-de"],
  commonMistakes: ["Focusing only on tools instead of problem-solving skills", "Not learning software engineering practices"],
  interviewQuestions: ["What excites you about data engineering?", "Describe a challenging data problem you solved"],
  flashcards: [{ front: "Junior vs Senior DE?", back: "Junior: executes tasks, writes scripts. Senior: designs systems, makes architecture decisions, mentors others, handles ambiguity." }],
  summary: "The DE role ranges from building ETL scripts to designing distributed systems. Focus on problem-solving, not just tools."
},

{
  id: "batch-vs-streaming", title: "Batch vs Streaming Processing", phase: "concepts", phaseLabel: "Modern DE Concepts",
  description: "Understand the fundamental difference between batch and stream processing, when to use each, and the Lambda/Kappa architectures.",
  difficulty: "beginner", estimatedHours: 4, importance: "must-know", interviewWeight: 4,
  careerLevel: "junior", interviewImportance: 4, productionImportance: 4,
  interviewRecommendation: "Learn Well — frequently asked in system design interviews",
  prerequisites: ["what-is-de"], learningObjectives: [
    "Distinguish batch, micro-batch, and real-time streaming",
    "Understand when to choose batch vs streaming",
    "Know the Lambda and Kappa architecture patterns",
    "Identify latency vs throughput tradeoffs"
  ],
  problemItSolves: "Different business needs require different data freshness. A daily report can use batch processing, but fraud detection needs real-time streaming. Choosing wrong means either wasted resources or missed SLAs.",
  whyItExists: "Batch processing (MapReduce, Spark) handles high throughput but with latency. Streaming (Kafka, Flink) handles low latency but with complexity. Modern systems often combine both.",
  realWorldUsage: "At Flipkart, product catalog updates run as nightly batch jobs, while real-time pricing and fraud detection use streaming pipelines. At Uber, trip data is processed in real-time for surge pricing but batch-analyzed for driver analytics.",
  theory: "## Batch vs Streaming\n\n### Batch Processing\n- Process data in scheduled intervals (hourly, daily)\n- High throughput, higher latency\n- Examples: Spark, Hive, dbt\n- Use case: Daily reports, monthly aggregations\n\n### Stream Processing\n- Process data as it arrives\n- Low latency, more complex\n- Examples: Kafka Streams, Spark Structured Streaming, Flink\n- Use case: Real-time dashboards, fraud detection\n\n### Lambda Architecture\n- Batch layer + Speed layer + Serving layer\n- Complex but provides both real-time and batch views\n\n### Kappa Architecture\n- Everything is a stream\n- Simpler but requires mature streaming infrastructure",
  resources: {
    docs: [],
    youtube: [{ title: "Batch vs Stream Processing Explained", url: "https://www.youtube.com/watch?v=A3Mvy8WMk04", duration: "20m" }],
    udemy: [],
    articles: [
      { title: "Streaming 101: The World Beyond Batch", url: "https://www.oreilly.com/radar/the-world-beyond-batch-streaming-101/" },
      { title: "Streaming 102: The World Beyond Batch", url: "https://www.oreilly.com/radar/the-world-beyond-batch-streaming-102/" }
    ]
  },
  miniProject: null, exercises: ["Compare batch vs streaming for 5 real-world scenarios", "Draw a Lambda architecture diagram for an e-commerce platform"],
  nextTopics: ["etl-vs-elt", "oltp-vs-olap"], previousTopics: ["what-is-de"],
  commonMistakes: ["Using streaming when batch would suffice (over-engineering)", "Underestimating streaming complexity and operational overhead", "Not considering exactly-once semantics in streaming"],
  interviewQuestions: ["When would you choose batch over streaming?", "What is the Lambda architecture?", "What is exactly-once processing?", "How does micro-batch differ from true streaming?"],
  flashcards: [
    { front: "Batch vs Stream Processing?", back: "Batch: scheduled, high throughput, higher latency. Stream: continuous, low latency, more complex. Choose based on business latency requirements." },
    { front: "Lambda vs Kappa Architecture?", back: "Lambda: separate batch + speed layers (complex, reliable). Kappa: everything is a stream (simpler, requires mature streaming infra)." }
  ],
  summary: "Choose batch for high-throughput, scheduled processing. Choose streaming for low-latency, real-time needs. Most production systems use a combination of both."
},

{
  id: "etl-vs-elt", title: "ETL vs ELT", phase: "concepts", phaseLabel: "Modern DE Concepts",
  description: "Understand the evolution from traditional ETL to modern ELT, and when to use each pattern in your data pipelines.",
  difficulty: "beginner", estimatedHours: 3, importance: "must-know", interviewWeight: 4,
  careerLevel: "junior", interviewImportance: 4, productionImportance: 4,
  interviewRecommendation: "Learn Well — core concept in every DE interview",
  prerequisites: ["what-is-de"], learningObjectives: [
    "Define ETL and ELT and their key differences",
    "Understand why the industry shifted from ETL to ELT",
    "Know when to use each pattern",
    "Map tools to ETL vs ELT paradigms"
  ],
  problemItSolves: "Raw data needs to be moved and transformed before it's useful. ETL and ELT are the two primary patterns for doing this. Choosing the right one affects cost, speed, and maintainability.",
  whyItExists: "ETL (Extract-Transform-Load) was designed when compute was expensive and storage was limited. ELT (Extract-Load-Transform) emerged when cloud storage became cheap and warehouses like BigQuery could transform data at scale.",
  realWorldUsage: "Razorpay uses ELT: they extract payment data, load it raw into their data lake, then transform it using Spark and dbt. The raw data is always preserved for re-processing.",
  theory: "## ETL vs ELT\n\n### ETL (Extract-Transform-Load)\n1. Extract data from sources\n2. Transform data in a staging area\n3. Load transformed data into target\n\n**When to use**: Limited storage, strict data governance, legacy systems\n\n### ELT (Extract-Load-Transform)\n1. Extract data from sources\n2. Load raw data into target (lake/warehouse)\n3. Transform data inside the target\n\n**When to use**: Cloud-native, modern stack, need raw data preservation\n\n### Modern Stack\n- **Extract**: Fivetran, Airbyte, custom scripts\n- **Load**: Direct to S3/BigQuery/Snowflake\n- **Transform**: dbt, Spark SQL",
  resources: {
    docs: [],
    youtube: [{ title: "ETL vs ELT Explained", url: "https://www.youtube.com/watch?v=voC0ewDeltA", duration: "15m" }],
    udemy: [],
    articles: [{ title: "The Modern Data Stack", url: "https://a16z.com/2020/10/15/the-emerging-architectures-for-modern-data-infrastructure/" }]
  },
  miniProject: null, exercises: ["Design an ETL pipeline for a legacy banking system", "Design an ELT pipeline for a modern e-commerce platform"],
  nextTopics: ["oltp-vs-olap", "data-pipeline"], previousTopics: ["what-is-de"],
  commonMistakes: ["Using ETL when ELT would be simpler and cheaper", "Not preserving raw data in ELT pipelines", "Over-transforming data before loading"],
  interviewQuestions: ["What is the difference between ETL and ELT?", "Why did the industry shift from ETL to ELT?", "When would you still use ETL?"],
  flashcards: [
    { front: "ETL vs ELT?", back: "ETL: transform before loading (legacy, limited storage). ELT: load raw, then transform in warehouse (modern, cloud-native, preserves raw data)." }
  ],
  summary: "ETL transforms before loading; ELT loads raw and transforms in the warehouse. Modern data engineering prefers ELT because storage is cheap and raw data preservation is valuable."
},

{
  id: "oltp-vs-olap", title: "OLTP vs OLAP", phase: "concepts", phaseLabel: "Modern DE Concepts",
  description: "Understand transactional vs analytical databases — their architecture, use cases, and why both exist in every data organization.",
  difficulty: "beginner", estimatedHours: 3, importance: "must-know", interviewWeight: 4,
  careerLevel: "junior", interviewImportance: 4, productionImportance: 4,
  interviewRecommendation: "Learn Well — fundamental concept tested in interviews",
  prerequisites: ["what-is-de"], learningObjectives: [
    "Distinguish OLTP and OLAP systems",
    "Understand row-store vs column-store architecture",
    "Know when to use each type",
    "Map common databases to OLTP/OLAP"
  ],
  problemItSolves: "You can't run heavy analytical queries on your production database without degrading user experience. OLAP systems are optimized for reads/aggregations; OLTP for writes/transactions.",
  whyItExists: "Applications need fast transactional databases (PostgreSQL, MySQL) for user operations. Analytics need columnar databases (Redshift, BigQuery) for aggregations over billions of rows.",
  realWorldUsage: "At PhonePe, PostgreSQL (OLTP) handles real-time payment transactions. The same data flows to Redshift (OLAP) for daily business reporting and trend analysis.",
  theory: "## OLTP vs OLAP\n\n| Feature | OLTP | OLAP |\n|---------|------|------|\n| Purpose | Transactions | Analytics |\n| Queries | Simple, many | Complex, few |\n| Storage | Row-oriented | Column-oriented |\n| Optimization | Write-heavy | Read-heavy |\n| Examples | PostgreSQL, MySQL | BigQuery, Redshift |\n\n### Column-Store Advantage\nFor a query like `SELECT AVG(salary) FROM employees`, a column store reads only the salary column (1 column out of 20), making it 20x more efficient than reading entire rows.",
  resources: {
    docs: [],
    youtube: [{ title: "OLTP vs OLAP Explained", url: "https://www.youtube.com/watch?v=iw-5kFzIdgY", duration: "12m" }],
    udemy: [],
    articles: [{ title: "OLTP vs OLAP", url: "https://www.ibm.com/topics/olap" }]
  },
  miniProject: null, exercises: ["Compare query performance on row-store vs column-store for 5 different query patterns"],
  nextTopics: ["data-warehouse", "data-pipeline"], previousTopics: ["what-is-de"],
  commonMistakes: ["Running analytical queries on OLTP databases", "Not understanding columnar storage benefits for analytical workloads"],
  interviewQuestions: ["What is the difference between OLTP and OLAP?", "Why are column stores faster for analytical queries?", "Give examples of OLTP and OLAP databases"],
  flashcards: [
    { front: "OLTP vs OLAP?", back: "OLTP: transactional, row-store, write-optimized (PostgreSQL). OLAP: analytical, column-store, read-optimized (Redshift, BigQuery)." },
    { front: "Why column stores for analytics?", back: "Column stores read only the needed columns, not entire rows. For 'SELECT AVG(salary)', it reads 1 column instead of 20, enabling massive compression and vectorized processing." }
  ],
  summary: "OLTP databases handle transactions (row-store, write-optimized). OLAP databases handle analytics (column-store, read-optimized). Data engineers move data from OLTP to OLAP."
},

{
  id: "data-pipeline", title: "Data Pipelines", phase: "concepts", phaseLabel: "Modern DE Concepts",
  description: "Understand data pipelines — the backbone of data engineering. Learn about pipeline architectures, components, and how to build reliable data flows.",
  difficulty: "beginner", estimatedHours: 4, importance: "must-know", interviewWeight: 4,
  careerLevel: "junior", interviewImportance: 4, productionImportance: 5,
  interviewRecommendation: "Learn Well — you will design pipelines in every interview",
  prerequisites: ["etl-vs-elt"], learningObjectives: [
    "Define data pipelines and their components",
    "Understand data flow patterns (pull, push, event-driven)",
    "Know pipeline reliability patterns (idempotency, retry, dead letter queues)",
    "Design a basic end-to-end pipeline"
  ],
  problemItSolves: "Data sits in many systems (databases, APIs, files). Pipelines automate the flow of data from sources to destinations, ensuring it arrives reliably and on time.",
  whyItExists: "Manual data movement doesn't scale. As organizations grow, they need automated, monitored, and fault-tolerant systems to move data between hundreds of systems.",
  realWorldUsage: "At Atlassian, data pipelines ingest data from Jira, Confluence, and Trello into their data lake. These pipelines process billions of events daily and must be reliable, monitored, and self-healing.",
  theory: "## Data Pipelines\n\n### Components\n1. **Source** — Where data originates (DB, API, files)\n2. **Ingestion** — How data is pulled/pushed\n3. **Processing** — Transformation and enrichment\n4. **Storage** — Where processed data lives\n5. **Serving** — How consumers access the data\n6. **Monitoring** — How you know it's working\n\n### Reliability Patterns\n- **Idempotency**: Running a pipeline twice produces the same result\n- **Retry with backoff**: Handle transient failures\n- **Dead Letter Queue**: Isolate failed records\n- **Checkpointing**: Resume from last success point",
  resources: {
    docs: [],
    youtube: [{ title: "Data Pipeline Architecture Explained", url: "https://www.youtube.com/watch?v=VtzvF17ysbc", duration: "25m" }],
    udemy: [],
    articles: [{ title: "The Log: What Every Software Engineer Should Know", url: "https://engineering.linkedin.com/distributed-systems/log-what-every-software-engineer-should-know-about-real-time-datas-unifying" }]
  },
  miniProject: null, exercises: ["Design a data pipeline for a food delivery app on paper", "List 5 failure modes and how to handle each"],
  nextTopics: ["data-quality", "data-governance"], previousTopics: ["etl-vs-elt"],
  commonMistakes: ["Building pipelines without monitoring", "Not making pipelines idempotent", "Tight coupling between pipeline stages"],
  interviewQuestions: ["What makes a data pipeline reliable?", "What is idempotency and why does it matter?", "How do you handle failed records in a pipeline?"],
  flashcards: [
    { front: "What is idempotency?", back: "A pipeline is idempotent if running it multiple times produces the same result. Essential for retries and reprocessing." },
    { front: "What is a dead letter queue?", back: "A separate storage location for records that failed processing. Allows the pipeline to continue while isolating problematic data for investigation." }
  ],
  summary: "Data pipelines automate data flow from sources to destinations. Build them to be idempotent, monitored, and fault-tolerant."
},

{
  id: "data-quality", title: "Data Quality", phase: "concepts", phaseLabel: "Modern DE Concepts",
  description: "Learn data quality dimensions, validation strategies, and tools — ensuring the data your pipelines produce is trustworthy and reliable.",
  difficulty: "intermediate", estimatedHours: 4, importance: "must-know", interviewWeight: 3,
  careerLevel: "mid", interviewImportance: 3, productionImportance: 5,
  interviewRecommendation: "Learn Enough — increasingly important in senior roles",
  prerequisites: ["data-pipeline"], learningObjectives: [
    "Define the 6 dimensions of data quality",
    "Implement data validation checks in pipelines",
    "Know data quality tools (Great Expectations, dbt tests, Soda)",
    "Design a data quality monitoring strategy"
  ],
  problemItSolves: "Bad data leads to bad decisions. If your pipeline produces incorrect or incomplete data, analysts make wrong conclusions and ML models produce unreliable predictions.",
  whyItExists: "As organizations scaled their data operations, they discovered that most data issues were caught too late — after they'd already impacted dashboards and decisions. Data quality checks at the pipeline level prevent this.",
  realWorldUsage: "At Amazon, data quality checks run at every stage of their warehouse pipelines. Anomaly detection alerts fire if metrics deviate beyond expected thresholds.",
  theory: "## Data Quality\n\n### Six Dimensions\n1. **Completeness** — No missing values\n2. **Accuracy** — Values are correct\n3. **Consistency** — Same data across systems\n4. **Timeliness** — Data arrives on schedule\n5. **Validity** — Values conform to expected formats\n6. **Uniqueness** — No duplicate records\n\n### Tools\n- **Great Expectations** — Python data validation\n- **dbt tests** — SQL-based assertions\n- **Soda** — Data monitoring\n- **Monte Carlo** — Data observability",
  resources: {
    docs: [{ title: "Great Expectations Documentation", url: "https://docs.greatexpectations.io/" }],
    youtube: [{ title: "Data Quality for Data Engineers", url: "https://www.youtube.com/watch?v=JuLT12TBaOI", duration: "30m" }],
    udemy: [],
    articles: []
  },
  miniProject: null, exercises: ["Write 10 data quality checks for an orders table", "Set up Great Expectations for a sample dataset"],
  nextTopics: ["data-governance", "metadata"], previousTopics: ["data-pipeline"],
  commonMistakes: ["Only checking data quality after it reaches the warehouse", "Not monitoring data freshness", "Writing tests that are too loose to catch real issues"],
  interviewQuestions: ["What are the dimensions of data quality?", "How do you implement data quality checks in a pipeline?", "What would you do if you discovered data quality issues in production?"],
  flashcards: [
    { front: "6 Dimensions of Data Quality?", back: "Completeness, Accuracy, Consistency, Timeliness, Validity, Uniqueness. Remember: CACTU² (like cactus)." }
  ],
  summary: "Data quality is about ensuring your data is complete, accurate, consistent, timely, valid, and unique. Implement checks at every pipeline stage."
},

{
  id: "data-governance", title: "Data Governance", phase: "concepts", phaseLabel: "Modern DE Concepts",
  description: "Understand data governance — policies, standards, and practices that ensure data is managed properly across an organization.",
  difficulty: "intermediate", estimatedHours: 3, importance: "good-to-know", interviewWeight: 2,
  careerLevel: "mid", interviewImportance: 2, productionImportance: 4,
  interviewRecommendation: "Know Concept — more important at senior/architect level",
  prerequisites: ["data-quality"], learningObjectives: [
    "Define data governance and its key components",
    "Understand data cataloging and lineage",
    "Know data access control patterns",
    "Understand regulatory compliance (GDPR, CCPA)"
  ],
  problemItSolves: "Without governance, organizations have data scattered everywhere, no one knows what data exists, who owns it, or whether it's safe to use. This leads to compliance violations, security breaches, and unreliable analytics.",
  whyItExists: "Regulations like GDPR require organizations to know what data they have and who can access it. Data governance provides the framework for managing data as a corporate asset.",
  realWorldUsage: "At Microsoft, data governance includes data classification (PII, confidential), access control through Unity Catalog, data lineage tracking, and automated compliance checks.",
  theory: "## Data Governance\n\n### Key Components\n- **Data Catalog** — Searchable inventory of all datasets\n- **Data Lineage** — Track data from source to consumption\n- **Access Control** — Who can read/write what data\n- **Data Classification** — PII, confidential, public\n- **Data Stewardship** — Assigned owners for each dataset\n\n### Tools\n- **Unity Catalog** (Databricks)\n- **AWS Lake Formation**\n- **Apache Atlas**\n- **DataHub** (LinkedIn open-source)",
  resources: {
    docs: [{ title: "DMBOK - Data Management Body of Knowledge", url: "https://www.dama.org/cpages/body-of-knowledge" }],
    youtube: [], udemy: [], articles: []
  },
  miniProject: null, exercises: ["Design a data governance framework for a startup", "Create a data catalog entry for a sales dataset"],
  nextTopics: ["metadata"], previousTopics: ["data-quality"],
  commonMistakes: ["Treating governance as a one-time project instead of ongoing practice", "Over-restricting data access, slowing down analysts"],
  interviewQuestions: ["What is data governance?", "How do you handle PII data in pipelines?", "What is data lineage?"],
  flashcards: [{ front: "What is data lineage?", back: "The tracking of data from its origin through all transformations to its final consumption point. Shows how data was created, modified, and used." }],
  summary: "Data governance ensures data is managed as a corporate asset — cataloged, access-controlled, classified, and compliant with regulations."
},

{
  id: "metadata", title: "Metadata Management", phase: "concepts", phaseLabel: "Modern DE Concepts",
  description: "Understand metadata — data about data — and why it's critical for discoverability, lineage, and governance in modern data platforms.",
  difficulty: "intermediate", estimatedHours: 2, importance: "good-to-know", interviewWeight: 2,
  careerLevel: "mid", interviewImportance: 2, productionImportance: 3,
  interviewRecommendation: "Know Concept — relevant for architecture discussions",
  prerequisites: ["data-governance"], learningObjectives: [
    "Distinguish technical, operational, and business metadata",
    "Understand metadata management tools and patterns",
    "Know how metadata enables data discovery"
  ],
  problemItSolves: "In large organizations, no one knows what data exists, where it lives, or what it means. Metadata management makes data discoverable and understandable.",
  whyItExists: "As data volumes grew, organizations couldn't rely on tribal knowledge about their datasets. Metadata management tools like DataHub and Amundsen emerged to solve the 'I can't find the data I need' problem.",
  realWorldUsage: "At Uber, DataHub indexes metadata from all their data systems (Hive, Kafka, Elasticsearch) so any engineer can search for and understand datasets across the organization.",
  theory: "## Metadata\n\n### Types of Metadata\n- **Technical**: Schema, data types, partition info, file format\n- **Operational**: Pipeline run times, data freshness, row counts\n- **Business**: Column descriptions, data owners, usage policies\n\n### Tools\n- **DataHub** (LinkedIn)\n- **Amundsen** (Lyft)\n- **Apache Atlas**\n- **OpenMetadata**",
  resources: {
    docs: [{ title: "DataHub Documentation", url: "https://datahubproject.io/docs/" }],
    youtube: [], udemy: [], articles: []
  },
  miniProject: null, exercises: [],
  nextTopics: ["data-warehouse"], previousTopics: ["data-governance"],
  commonMistakes: ["Not documenting schema changes", "Treating metadata as an afterthought"],
  interviewQuestions: ["What is metadata?", "What are the different types of metadata?"],
  flashcards: [{ front: "3 types of metadata?", back: "Technical (schema, types), Operational (run times, freshness), Business (descriptions, owners, policies)." }],
  summary: "Metadata is data about data. Managing it well enables data discovery, lineage tracking, and governance at scale."
},

// ═══════════════════════════════════════════════════════════════════
// MODERN DATA ARCHITECTURE
// ═══════════════════════════════════════════════════════════════════
{
  id: "data-warehouse", title: "Data Warehouse", phase: "architecture", phaseLabel: "Modern Data Architecture",
  description: "Understand data warehouses — structured, schema-on-write storage optimized for analytical queries and business reporting.",
  difficulty: "intermediate", estimatedHours: 5, importance: "must-know", interviewWeight: 4,
  careerLevel: "junior", interviewImportance: 4, productionImportance: 5,
  interviewRecommendation: "Learn Well — core architecture concept",
  prerequisites: ["oltp-vs-olap"], learningObjectives: [
    "Define data warehouse architecture and design principles",
    "Understand ETL/ELT loading patterns into warehouses",
    "Compare major warehouse solutions (Redshift, BigQuery, Snowflake)",
    "Know schema-on-write vs schema-on-read"
  ],
  problemItSolves: "Business users need a single, reliable source of truth for analytics. Data warehouses consolidate data from multiple operational systems into one optimized analytical store.",
  whyItExists: "Bill Inmon and Ralph Kimball pioneered data warehousing in the 1990s. The concept evolved from expensive on-premise solutions (Teradata) to cloud-native, pay-per-query systems (BigQuery, Snowflake).",
  realWorldUsage: "At Flipkart, Redshift serves as the central data warehouse where all business teams query sales, inventory, and customer data for reporting and decision-making.",
  theory: "## Data Warehouse\n\n### Key Characteristics\n- **Subject-oriented**: Organized by business domains\n- **Integrated**: Consolidated from multiple sources\n- **Non-volatile**: Data is not deleted or updated\n- **Time-variant**: Historical data is preserved\n\n### Schema-on-Write\nData must conform to a predefined schema before loading. Ensures data quality but requires upfront modeling.\n\n### Popular Solutions\n| Warehouse | Pricing | Best For |\n|-----------|---------|----------|\n| Redshift | Instance-based | AWS-native workloads |\n| BigQuery | Pay-per-query | Ad-hoc analytics |\n| Snowflake | Compute/storage separate | Multi-cloud |",
  resources: {
    docs: [{ title: "Amazon Redshift Documentation", url: "https://docs.aws.amazon.com/redshift/" }],
    youtube: [{ title: "Data Warehouse Concepts", url: "https://www.youtube.com/watch?v=AHR_7jFCMeY", duration: "30m" }],
    udemy: [],
    articles: [{ title: "What is a Data Warehouse?", url: "https://www.databricks.com/glossary/data-warehouse" }]
  },
  miniProject: null, exercises: ["Compare Redshift, BigQuery, and Snowflake across 5 dimensions", "Design a warehouse schema for an e-commerce company"],
  nextTopics: ["data-lake", "star-schema"], previousTopics: ["oltp-vs-olap"],
  commonMistakes: ["Treating the warehouse as a data dump without proper modeling", "Not partitioning tables leading to expensive full scans"],
  interviewQuestions: ["What is a data warehouse?", "Schema-on-write vs schema-on-read?", "Compare Redshift vs BigQuery vs Snowflake"],
  flashcards: [
    { front: "4 characteristics of a data warehouse?", back: "Subject-oriented, Integrated, Non-volatile, Time-variant (Inmon's definition)." },
    { front: "Schema-on-write vs schema-on-read?", back: "Schema-on-write (warehouse): enforce schema before loading. Schema-on-read (lake): store raw, apply schema when reading." }
  ],
  summary: "Data warehouses are structured, schema-on-write stores optimized for analytical queries. They consolidate data from multiple sources into a single source of truth."
},

{
  id: "data-lake", title: "Data Lake", phase: "architecture", phaseLabel: "Modern Data Architecture",
  description: "Understand data lakes — schema-on-read storage that holds raw data in any format at massive scale, serving as the foundation for modern analytics.",
  difficulty: "intermediate", estimatedHours: 4, importance: "must-know", interviewWeight: 4,
  careerLevel: "junior", interviewImportance: 4, productionImportance: 5,
  interviewRecommendation: "Learn Well — essential for modern data architecture",
  prerequisites: ["data-warehouse"], learningObjectives: [
    "Define data lake architecture and design principles",
    "Understand schema-on-read and its benefits",
    "Know data lake zones (raw/bronze, cleaned/silver, curated/gold)",
    "Understand data lake anti-patterns (data swamp)"
  ],
  problemItSolves: "Warehouses require upfront schema design and can't handle unstructured data. Data lakes accept any data format (JSON, Parquet, images, logs) at low cost, enabling exploration and ML workloads.",
  whyItExists: "As organizations needed to store massive volumes of diverse data (logs, images, clickstreams), traditional warehouses were too rigid and expensive. Hadoop and cloud object storage (S3) enabled cheap, scalable data lakes.",
  realWorldUsage: "At Netflix, their data lake on S3 stores petabytes of viewing data, A/B test results, and content metadata. Data scientists query this lake to build recommendation models.",
  theory: "## Data Lake\n\n### Key Characteristics\n- **Schema-on-read**: No predefined schema required\n- **Raw data preservation**: Original data is never modified\n- **Multi-format**: Supports structured, semi-structured, unstructured\n- **Low cost**: Object storage (S3) is cheap\n\n### Lake Zones\n1. **Bronze/Raw** — Exact copy of source data\n2. **Silver/Cleaned** — Validated, deduped, typed\n3. **Gold/Curated** — Business-level aggregations and models\n\n### Data Swamp Anti-Pattern\nA data lake becomes a swamp when:\n- No metadata or documentation\n- No access controls\n- No data quality checks\n- Nobody knows what data exists",
  resources: {
    docs: [{ title: "AWS S3 Data Lake Guide", url: "https://aws.amazon.com/big-data/datalakes-and-analytics/" }],
    youtube: [], udemy: [],
    articles: [{ title: "What is a Data Lake?", url: "https://www.databricks.com/glossary/data-lake" }]
  },
  miniProject: null, exercises: ["Design a data lake zone structure for a ride-sharing company"],
  nextTopics: ["lakehouse-arch", "medallion"], previousTopics: ["data-warehouse"],
  commonMistakes: ["Creating a data swamp by dumping data without governance", "Not cataloging data in the lake", "Storing everything as CSV instead of columnar formats"],
  interviewQuestions: ["What is a data lake?", "What is a data swamp?", "Data lake vs data warehouse?", "What are lake zones?"],
  flashcards: [
    { front: "Data Lake vs Data Warehouse?", back: "Lake: schema-on-read, any format, cheap storage, ML-friendly. Warehouse: schema-on-write, structured only, expensive, BI-optimized." },
    { front: "Bronze / Silver / Gold?", back: "Bronze: raw source data. Silver: cleaned and validated. Gold: business-level aggregations ready for reporting." }
  ],
  summary: "Data lakes store raw data in any format at massive scale. Use zones (bronze/silver/gold) to progressively refine data quality. Avoid data swamps through governance."
},

{
  id: "lakehouse-arch", title: "Lakehouse Architecture", phase: "architecture", phaseLabel: "Modern Data Architecture",
  description: "Understand the Lakehouse — the convergence of data lakes and warehouses that combines the best of both worlds with ACID transactions on open formats.",
  difficulty: "intermediate", estimatedHours: 5, importance: "must-know", interviewWeight: 5,
  careerLevel: "mid", interviewImportance: 5, productionImportance: 5,
  interviewRecommendation: "Learn Deeply — this is the dominant architecture in 2026",
  prerequisites: ["data-lake"], learningObjectives: [
    "Define the Lakehouse architecture and its key innovations",
    "Understand how Delta Lake, Iceberg, and Hudi enable the Lakehouse",
    "Know the advantages over separate lake + warehouse",
    "Understand ACID transactions on data lakes"
  ],
  problemItSolves: "Organizations had to maintain both a lake AND a warehouse (costly, complex, data duplication). The Lakehouse merges them: warehouse-quality reliability on lake-scale storage.",
  whyItExists: "Databricks published the Lakehouse paper in 2021, arguing that open table formats (Delta, Iceberg) can bring ACID transactions, schema enforcement, and time travel to data lakes — eliminating the need for a separate warehouse.",
  realWorldUsage: "Uber, Netflix, and Apple all use Lakehouse architectures. Uber uses Apache Hudi on their data lake to get ACID transactions and incremental processing at petabyte scale.",
  theory: "## Lakehouse Architecture\n\n### Key Innovation\nThe Lakehouse adds a **metadata layer** on top of cloud object storage that provides:\n- ACID transactions\n- Schema enforcement and evolution\n- Time travel (query historical data)\n- Audit logging\n- Indexing and caching\n\n### Enabling Technologies\n- **Delta Lake** (Databricks) — Most popular\n- **Apache Iceberg** (Netflix) — Growing fast\n- **Apache Hudi** (Uber) — Upsert-focused\n\n### Benefits over Lake + Warehouse\n1. Single copy of data (no duplication)\n2. Lower cost (just object storage)\n3. Open formats (no vendor lock-in)\n4. Support both BI and ML workloads",
  resources: {
    docs: [{ title: "Databricks Lakehouse Platform", url: "https://www.databricks.com/product/data-lakehouse" }],
    youtube: [{ title: "What is a Lakehouse?", url: "https://www.youtube.com/watch?v=sSGCIA4YJkA", duration: "20m" }],
    udemy: [],
    articles: [{ title: "Lakehouse: A New Generation of Open Platforms", url: "https://www.cidrdb.org/cidr2021/papers/cidr2021_paper17.pdf" }]
  },
  miniProject: null, exercises: ["Compare Delta Lake, Iceberg, and Hudi across 5 dimensions", "Design a Lakehouse architecture for a fintech company"],
  nextTopics: ["medallion", "data-mesh", "delta-format"], previousTopics: ["data-lake"],
  commonMistakes: ["Thinking Lakehouse means just using Delta Lake", "Not implementing proper governance on the Lakehouse", "Ignoring Iceberg as an alternative to Delta Lake"],
  interviewQuestions: ["What is a Lakehouse?", "How does the Lakehouse differ from a lake + warehouse?", "Compare Delta Lake vs Iceberg vs Hudi", "What are ACID transactions on a data lake?"],
  flashcards: [
    { front: "What is a Lakehouse?", back: "An architecture that adds warehouse capabilities (ACID, schema enforcement, time travel) to data lake storage via open table formats like Delta Lake or Iceberg." },
    { front: "Delta Lake vs Iceberg vs Hudi?", back: "Delta: Databricks-backed, most mature. Iceberg: Netflix-backed, best schema evolution. Hudi: Uber-backed, best for upserts/CDC." }
  ],
  summary: "The Lakehouse merges lakes and warehouses using open table formats (Delta, Iceberg). It provides ACID transactions, schema enforcement, and time travel on cheap object storage."
},

{
  id: "medallion", title: "Medallion Architecture", phase: "architecture", phaseLabel: "Modern Data Architecture",
  description: "Learn the Medallion (Multi-hop) architecture — the standard pattern for organizing data in a Lakehouse with Bronze, Silver, and Gold layers.",
  difficulty: "intermediate", estimatedHours: 3, importance: "must-know", interviewWeight: 4,
  careerLevel: "mid", interviewImportance: 4, productionImportance: 5,
  interviewRecommendation: "Learn Well — standard architecture pattern in Lakehouse companies",
  prerequisites: ["lakehouse-arch"], learningObjectives: [
    "Define the Bronze, Silver, and Gold layers",
    "Understand data transformations at each layer",
    "Design a Medallion architecture for a given use case",
    "Know the quality guarantees at each layer"
  ],
  problemItSolves: "Without a structured approach to data refinement, teams create ad-hoc transformations that are hard to maintain and debug. The Medallion pattern standardizes data quality progression.",
  whyItExists: "Databricks popularized this pattern as a best practice for organizing Lakehouse data. It provides a clear, auditable path from raw ingestion to business-ready analytics.",
  realWorldUsage: "At Razorpay, payment events land in Bronze (raw JSON), get validated and typed in Silver, and become aggregated metrics (daily revenue, fraud scores) in Gold.",
  theory: "## Medallion Architecture\n\n### Bronze Layer (Raw)\n- Exact copy of source data\n- Append-only\n- No schema enforcement\n- Purpose: Audit trail, reprocessing\n\n### Silver Layer (Cleaned)\n- Schema enforced and typed\n- Deduplication applied\n- Data quality checks pass\n- Purpose: Analysis-ready, joins work\n\n### Gold Layer (Business)\n- Aggregated and modeled\n- Star schema or wide tables\n- Optimized for specific use cases\n- Purpose: Dashboards, ML features, APIs",
  resources: {
    docs: [{ title: "Medallion Architecture - Databricks", url: "https://www.databricks.com/glossary/medallion-architecture" }],
    youtube: [], udemy: [], articles: []
  },
  miniProject: { title: "Medallion Pipeline Design", description: "Design a complete Bronze → Silver → Gold pipeline for an e-commerce platform. Define the transformations, quality checks, and schema at each layer.", skills: ["Architecture", "Data Modeling", "Data Quality"], estimatedHours: 2 },
  exercises: ["Design Bronze/Silver/Gold schemas for a social media platform"],
  nextTopics: ["data-contracts", "star-schema"], previousTopics: ["lakehouse-arch"],
  commonMistakes: ["Skipping Silver and going directly from Bronze to Gold", "Making Gold tables too generic instead of use-case specific", "Not implementing quality gates between layers"],
  interviewQuestions: ["Explain the Medallion architecture", "What goes in Bronze vs Silver vs Gold?", "Why not just have one layer?"],
  flashcards: [
    { front: "Bronze / Silver / Gold layers?", back: "Bronze: raw data as-is from source. Silver: cleaned, validated, typed, deduplicated. Gold: business-level aggregations optimized for specific use cases." }
  ],
  summary: "The Medallion architecture organizes data in Bronze (raw) → Silver (cleaned) → Gold (business) layers, providing progressive data quality refinement."
},

{
  id: "data-mesh", title: "Data Mesh", phase: "architecture", phaseLabel: "Modern Data Architecture",
  description: "Understand Data Mesh — a decentralized approach to data ownership where domain teams own their data products end-to-end.",
  difficulty: "advanced", estimatedHours: 3, importance: "good-to-know", interviewWeight: 2,
  careerLevel: "senior", interviewImportance: 2, productionImportance: 3,
  interviewRecommendation: "Know Concept — relevant for senior/architect discussions",
  prerequisites: ["lakehouse-arch"], learningObjectives: [
    "Define Data Mesh and its four principles",
    "Understand domain ownership vs centralized data teams",
    "Know when Data Mesh makes sense vs centralized architectures"
  ],
  problemItSolves: "In large organizations, centralized data teams become bottlenecks. Data Mesh distributes data ownership to the teams that best understand the data (domain teams).",
  whyItExists: "Zhamak Dehghani proposed Data Mesh in 2019 at ThoughtWorks, arguing that centralized data platforms don't scale organizationally. The concept borrows from microservices architecture.",
  realWorldUsage: "Companies like Zalando, JPMorgan, and Netflix have adopted Data Mesh principles, giving domain teams (payments, shipping, content) ownership of their data products.",
  theory: "## Data Mesh\n\n### Four Principles\n1. **Domain ownership** — Each domain owns its data\n2. **Data as a product** — Treat data like a product with SLAs\n3. **Self-serve platform** — Provide tooling for domain teams\n4. **Federated governance** — Global standards, local execution",
  resources: {
    docs: [],
    youtube: [{ title: "Data Mesh Explained", url: "https://www.youtube.com/watch?v=_bmYXWCxF_Q", duration: "25m" }],
    udemy: [],
    articles: [{ title: "Data Mesh Principles", url: "https://martinfowler.com/articles/data-mesh-principles.html" }]
  },
  miniProject: null, exercises: [],
  nextTopics: ["data-fabric"], previousTopics: ["lakehouse-arch"],
  commonMistakes: ["Adopting Data Mesh when you don't have the organizational maturity", "Confusing Data Mesh with just decentralizing data storage"],
  interviewQuestions: ["What is Data Mesh?", "When would you recommend Data Mesh over a centralized approach?"],
  flashcards: [{ front: "4 principles of Data Mesh?", back: "Domain ownership, Data as a product, Self-serve platform, Federated governance." }],
  summary: "Data Mesh decentralizes data ownership to domain teams. It works for large organizations with mature engineering cultures."
},

{
  id: "data-fabric", title: "Data Fabric", phase: "architecture", phaseLabel: "Modern Data Architecture",
  description: "Overview of Data Fabric — an AI-driven approach to data integration that automates data management across environments.",
  difficulty: "advanced", estimatedHours: 2, importance: "advanced", interviewWeight: 1,
  careerLevel: "architect", interviewImportance: 1, productionImportance: 2,
  interviewRecommendation: "Overview Only — know the concept, not the details",
  prerequisites: ["data-mesh"], learningObjectives: ["Define Data Fabric and how it differs from Data Mesh", "Understand when Data Fabric is relevant"],
  problemItSolves: "Managing data across multiple environments (on-prem, cloud, multi-cloud) is complex. Data Fabric uses AI/ML to automate data integration and governance across these environments.",
  whyItExists: "Gartner promoted Data Fabric as an alternative to Data Mesh, focusing on technology-driven automation rather than organizational change.",
  realWorldUsage: "Enterprise companies with hybrid environments (IBM, SAP customers) use Data Fabric concepts to unify data management across on-premise and cloud systems.",
  theory: "## Data Fabric\n\n### Key Idea\nData Fabric is a technology-driven architecture that uses AI/ML to automate:\n- Data discovery and cataloging\n- Data integration across systems\n- Metadata management\n- Access control and governance\n\n### Data Fabric vs Data Mesh\n- **Data Mesh**: Organizational change (decentralized ownership)\n- **Data Fabric**: Technology solution (automated integration)\n- They can complement each other",
  resources: {
    docs: [], youtube: [], udemy: [],
    articles: [{ title: "Data Fabric vs Data Mesh", url: "https://www.ibm.com/topics/data-fabric" }]
  },
  miniProject: null, exercises: [],
  nextTopics: ["data-contracts"], previousTopics: ["data-mesh"],
  commonMistakes: ["Confusing Data Fabric with Data Mesh"],
  interviewQuestions: ["What is Data Fabric?", "How does it differ from Data Mesh?"],
  flashcards: [{ front: "Data Fabric vs Data Mesh?", back: "Data Fabric: technology-driven, automated integration. Data Mesh: organizational-driven, decentralized ownership. They can complement each other." }],
  summary: "Data Fabric uses AI/ML to automate data integration across environments. It's a technology approach compared to Data Mesh's organizational approach."
},

{
  id: "data-contracts", title: "Data Contracts", phase: "architecture", phaseLabel: "Modern Data Architecture",
  description: "Learn data contracts — formal agreements between data producers and consumers that define schema, quality, and SLAs for data exchange.",
  difficulty: "intermediate", estimatedHours: 2, importance: "good-to-know", interviewWeight: 2,
  careerLevel: "mid", interviewImportance: 2, productionImportance: 4,
  interviewRecommendation: "Know Concept — growing trend in modern data engineering",
  prerequisites: ["medallion"], learningObjectives: [
    "Define data contracts and their components",
    "Understand how contracts prevent breaking changes",
    "Know tools and patterns for implementing contracts"
  ],
  problemItSolves: "When upstream teams change their schemas without notice, downstream pipelines break. Data contracts formalize the agreement so changes are coordinated and tested.",
  whyItExists: "As data ecosystems grew, schema changes became the #1 cause of pipeline failures. Data contracts bring the 'API contract' concept from microservices to data pipelines.",
  realWorldUsage: "At GoJek (similar to Swiggy), data contracts ensure that the payments team can't change their event schema without approval from all downstream consumers.",
  theory: "## Data Contracts\n\n### Components\n- **Schema definition** (Protobuf, Avro, JSON Schema)\n- **Quality guarantees** (freshness, completeness)\n- **SLAs** (availability, latency)\n- **Ownership** (who is responsible)\n- **Change management** (how to evolve the contract)\n\n### Benefits\n- Prevent breaking changes\n- Enable independent team velocity\n- Document data expectations\n- Support data governance",
  resources: {
    docs: [], youtube: [], udemy: [],
    articles: [{ title: "Data Contracts — Introduction", url: "https://datacontract.com/" }]
  },
  miniProject: null, exercises: ["Write a data contract for a user events table"],
  nextTopics: ["csv-json"], previousTopics: ["medallion"],
  commonMistakes: ["Making contracts too strict, blocking all schema evolution", "Not enforcing contracts in CI/CD"],
  interviewQuestions: ["What is a data contract?", "How do data contracts prevent pipeline failures?"],
  flashcards: [{ front: "What is a data contract?", back: "A formal agreement between data producer and consumer defining schema, quality, SLAs, and change management. Like an API contract for data." }],
  summary: "Data contracts formalize agreements between producers and consumers, preventing breaking schema changes and ensuring data reliability."
},

];

// Write the initial batch
fs.writeFileSync('src/data/modules.json', JSON.stringify(modules, null, 2));
console.log(`Phase 1: Wrote ${modules.length} modules (Foundations + Concepts + Architecture)`);
