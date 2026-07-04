const fs = require('fs');

const articlesMap = {
  "python": [
    { title: "Functional Data Engineering — A modern paradigm", url: "https://maximebeauchemin.medium.com/functional-data-engineering-a-modern-paradigm-for-batch-data-processing-2327ec32c42a" },
    { title: "Python Clean Code for Data Engineers", url: "https://towardsdatascience.com/clean-code-for-data-engineers-579c8dcdcb21" }
  ],
  "sql": [
    { title: "Use The Index, Luke! - SQL Performance Explained", url: "https://use-the-index-luke.com/" },
    { title: "Advanced SQL - Window Functions", url: "https://mode.com/sql-tutorial/sql-window-functions/" }
  ],
  "git-linux": [
    { title: "The Log: What every software engineer should know about real-time data's unifying abstraction", url: "https://engineering.linkedin.com/distributed-systems/log-what-every-software-engineer-should-know-about-real-time-datas-unifying" }
  ],
  "data-pipelines": [
    { title: "The Log: What every software engineer should know about real-time data's unifying abstraction", url: "https://engineering.linkedin.com/distributed-systems/log-what-every-software-engineer-should-know-about-real-time-datas-unifying" },
    { title: "Data Engineering Ecosystem: An Interactive Map", url: "https://landscape.data.io/" }
  ],
  "etl-vs-elt": [
    { title: "The Modern Data Stack: Past, Present, and Future", url: "https://a16z.com/2020/10/15/the-emerging-architectures-for-modern-data-infrastructure/" },
    { title: "ETL vs ELT: The Shift in Data Integration", url: "https://www.fivetran.com/blog/etl-vs-elt" }
  ],
  "oltp-vs-olap": [
    { title: "OLTP vs. OLAP: What's the Difference?", url: "https://www.ibm.com/cloud/blog/oltp-vs-olap" }
  ],
  "batch-vs-streaming": [
    { title: "Streaming 101: The world beyond batch", url: "https://www.oreilly.com/radar/the-world-beyond-batch-streaming-101/" },
    { title: "Streaming 102: The world beyond batch", url: "https://www.oreilly.com/radar/the-world-beyond-batch-streaming-102/" }
  ],
  "warehouse-lake-lakehouse": [
    { title: "Lakehouse: A New Generation of Open Platforms", url: "https://databricks.com/wp-content/uploads/2021/01/cidr-lakehouse-paper.pdf" },
    { title: "What is a Data Lakehouse?", url: "https://www.databricks.com/glossary/data-lakehouse" }
  ],
  "csv-json": [
    { title: "JSON vs Parquet - When to use which?", url: "https://www.confluent.io/blog/json-vs-parquet/" }
  ],
  "parquet": [
    { title: "Diving deep into Apache Parquet", url: "https://databricks.com/session/diving-into-apache-parquet" },
    { title: "How Parquet Files Work", url: "https://www.dremio.com/resources/guides/apache-parquet/" }
  ],
  "avro-orc": [
    { title: "Avro vs. Parquet vs. ORC", url: "https://www.nexla.com/blog/avro-vs-parquet-vs-orc/" }
  ],
  "partitioning": [
    { title: "The Small Files Problem in Hadoop and Spark", url: "https://towardsdatascience.com/the-small-files-problem-in-hadoop-and-spark-5b12852277d3" },
    { title: "Spark Partitioning Strategies", url: "https://www.databricks.com/glossary/partitioning" }
  ],
  "clusters": [
    { title: "MapReduce: Simplified Data Processing on Large Clusters", url: "https://research.google/pubs/pub62/" },
    { title: "A Brief History of Big Data", url: "https://www.odbms.org/2014/11/brief-history-big-data/" }
  ],
  "shuffling": [
    { title: "Spark Architecture: Shuffle", url: "https://0x0fff.com/spark-architecture-shuffle/" },
    { title: "Understanding Spark Shuffle", url: "https://medium.com/@jatin.sethi/understanding-spark-shuffle-b27e8d697b0a" }
  ],
  "fault-tolerance": [
    { title: "Resilient Distributed Datasets: A Fault-Tolerant Abstraction", url: "https://www.usenix.org/system/files/conference/nsdi12/nsdi12-final138.pdf" }
  ],
  "pyspark": [
    { title: "PySpark Best Practices", url: "https://coxautomotivedatasolutions.github.io/pyspark-best-practices/" }
  ],
  "spark-sql": [
    { title: "A Tale of Three Apache Spark APIs: RDDs, DataFrames, and Datasets", url: "https://www.databricks.com/blog/2016/07/14/a-tale-of-three-apache-spark-apis-rdds-dataframes-and-datasets.html" }
  ],
  "spark-optimization": [
    { title: "Adaptive Query Execution in Spark 3.0", url: "https://www.databricks.com/blog/2020/05/29/adaptive-query-execution-speeding-up-spark-sql-at-runtime.html" },
    { title: "Top 5 Mistakes When Writing Spark Applications", url: "https://www.databricks.com/session/top-5-mistakes-when-writing-spark-applications" }
  ],
  "spark-internals": [
    { title: "Deep Dive into Spark SQL's Catalyst Optimizer", url: "https://www.databricks.com/blog/2015/04/13/deep-dive-into-spark-sqls-catalyst-optimizer.html" },
    { title: "Project Tungsten: Bringing Apache Spark Closer to Bare Metal", url: "https://www.databricks.com/blog/2015/04/28/project-tungsten-bringing-spark-closer-to-bare-metal.html" }
  ],
  "delta-lake": [
    { title: "Delta Lake: High-Performance ACID Table Storage over Cloud Object Stores", url: "https://vldb.org/pvldb/vol13/p3411-armbrust.pdf" }
  ],
  "databricks": [
    { title: "Databricks Documentation: Getting Started", url: "https://docs.databricks.com/getting-started/index.html" }
  ],
  "medallion": [
    { title: "What is a Medallion Architecture?", url: "https://www.databricks.com/glossary/medallion-architecture" }
  ],
  "unity-catalog": [
    { title: "Data Governance with Unity Catalog", url: "https://www.databricks.com/product/unity-catalog" }
  ]
};

const dataPath = 'src/data/modules.json';
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

data.forEach(m => {
  if (articlesMap[m.id]) {
    m.resources.articles = articlesMap[m.id];
  } else {
    // Keep existing or empty
    m.resources.articles = m.resources.articles || [];
  }
});

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
console.log('Successfully updated modules.json with deep researched articles.');
