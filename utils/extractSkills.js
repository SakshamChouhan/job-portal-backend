const natural = require("natural");

const SKILL_KEYWORDS = new Set([
    "python", "javascript", "react", "node", "mongodb", "html", "css", "django",
    "flask", "java", "c++", "typescript", "express", "mysql", "docker", "aws",
    "azure", "kubernetes", "graphql", "git", "tailwind", "redux", "postgresql",
    "fastapi", "nextjs", "ruby", "rails", "vuejs", "angular", "swift", "objective-c",
    "flutter", "dart", "scala", "golang", "rust", "haskell", "kotlin", "elixir", "terraform",
    "azure-devops", "jenkins", "circleci", "webpack", "vite", "npm", "yarn", "bower", "typescript",
    "apollo", "prisma", "solidity", "ethereum", "web3", "vim", "emacs", "cloudflare", "algolia",
    "pandas", "numpy", "matplotlib", "seaborn", "tensorflow", "keras", "pytorch", "scikit-learn",
    "opencv", "scipy", "jupyter", "spark", "hadoop", "sagemaker", "gcp", "bigquery", "redshift",
    "snowflake", "sqlite", "mongodb", "firebase", "couchdb", "realm", "neo4j", "redis", "memcached",
    "rabbitmq", "apache-kafka", "mysql", "sqlite", "redis", "elastic-search", "aws-lambda",
    "cloud-functions", "azure-functions", "lambda", "eventbridge", "aws-s3", "cloudfront", "s3",
    "gcloud", "google-cloud-storage", "digitalocean", "heroku", "nginx", "apache", "lightsail",
    "nginx", "vps", "ubuntu", "debian", "centos", "redhat", "docker-compose", "k3s", "helm",
    "minikube", "istio", "prometheus", "grafana", "jenkins-x", "ansible", "chef", "puppet",
    "terraform", "saltstack", "aws-ec2", "aws-rds", "cloudwatch", "cloudformation", "beanstalk",
    "load-balancer", "consul", "vagrant", "serverless", "ci-cd", "devops", "infrastructure-as-code",
    "continuous-delivery", "nginx", "logstash", "elasticsearch", "kibana", "grafana", "datadog", "prometheus",
    "docker-registry", "sonarqube", "appsignal", "circleci", "bitbucket-pipelines", "buildkite", "octopus-deploy",
    "maven", "gradle", "jenkins", "teamcity", "artifactory", "nexus-repository", "bash", "zsh", "fish-shell",
    "powershell", "batch-scripting", "python-scripting", "shell-scripting", "elasticsearch", "logstash", "kibana",
    "azure-pipelines", "aws-cloudformation", "spring", "spring-boot", "quarkus", "micronaut", "gwt",
    "vaadin", "struts", "jsf", "playframework", "grails", "dropwizard", "nestjs", "loopback", "serverless",
    "gitlab", "github", "gitlab-ci", "mercurial", "subversion", "perforce", "cv", "latex", "github-actions",
    "bitbucket", "git-flow", "svn", "zip", "tar", "gzip", "openssl", "ssl", "oauth2", "jwt", "identity-server",
    "openid-connect", "ldap", "active-directory", "saml", "oauth", "kafka", "rabbitmq", "cloudpubsub", "grpc",
    "socket-io", "webrtc", "push-notifications", "webhooks", "mqtt", "firebase-messaging", "web-sockets",
    "pusher", "socketio", "ratpack", "cloud-messaging", "redis-cache", "auth0", "okta", "lastpass", "1password",
    "vulnerability-management", "metasploit", "kali-linux", "burp-suite", "wireshark", "snort", "nmap", "openvas",
    "nessus", "kali", "pentesting", "ethical-hacking", "cybersecurity", "vuln", "vulnerability-assessment",
    "blackhat", "redteam", "blue-team", "shellcode", "cve", "malware", "xss", "sql-injection", "rce", "ddos",
    "phishing", "dns-spoofing", "crypto", "blockchain", "hashing", "encryption", "ssl-tls", "http2", "tcp-ip",
    "web-security", "compliance", "iso27001", "gdpr", "pci-dss", "hipaa", "soc2", "itil", "siem", "nac", "soa",
    "ipa", "cmmi", "waterfall", "scrum", "agile", "scrum-master", "product-owner", "product-manager", "project-manager",
    "kanban", "lean", "six-sigma", "devops", "ci-cd-pipeline", "unit-testing", "mocking", "pytest", "jest", "mocha",
    "chai", "karma", "testng", "selenium", "cypress", "pupeteer", "junit", "test-driven-development", "bdd", "tdd",
    "selenium-webdriver", "cucumber", "load-testing", "postman", "swagger", "insomnia", "mock-service", "soapui",
    "apidocs", "graphql-docs", "swagger-ui", "postgrest", "automated-testing", "performance-testing", "code-coverage",
    "code-quality", "test-automation", "api-testing", "mobile-testing", "integration-testing", "load-testing", "appium",
    "e2e-testing", "unit-testing", "mobile-automation", "microservices-architecture", "clean-architecture", "event-driven",
    "multithreading", "async-programming", "concurrency", "threading", "parallel-programming", "rxjs", "rxjs-operators",
    "async-await", "promise", "ajax", "api-calls", "xhr", "fetch-api", "axios", "fetch-request", "http-request", "http-methods"
  ]);
  

const extractSkills = (text) => {
  const tokenizer = new natural.WordTokenizer();
  const words = tokenizer.tokenize(text.toLowerCase());

  return [...new Set(words.filter(word => SKILL_KEYWORDS.has(word)))];
};

module.exports = extractSkills;
