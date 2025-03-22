const axios = require("axios");
const xml2js = require("xml2js");

const fetchRemoteOKJobs = async () => {
  try {
    const response = await axios.get("https://remoteok.io/api");
    const jobs = response.data;

    if (!Array.isArray(jobs) || jobs.length === 0) return [];

    return jobs.slice(1).map(job => ({
      title: job.position || "No Title",
      company: job.company || "No Company",
      link: job.url || "No Link",
      source: "RemoteOK",
    }));
  } catch (error) {
    console.error("❌ Error fetching RemoteOK jobs:", error.message);
    return [];
  }
};

const fetchRemotiveJobs = async () => {
  try {
    const response = await axios.get("https://remotive.io/api/remote-jobs");
    return response.data.jobs.map(job => ({
      title: job.title,
      company: job.company_name,
      link: job.url,
      source: "Remotive",
    }));
  } catch (error) {
    console.error("❌ Error fetching Remotive jobs:", error.message);
    return [];
  }
};

const fetchWWRJobs = async () => {
  try {
    const response = await axios.get("https://weworkremotely.com/categories/remote-programming-jobs.rss");
    const result = await xml2js.parseStringPromise(response.data, { explicitArray: false });

    return result.rss.channel.item.map(job => ({
      title: job.title,
      company: job["dc:creator"] || "No Company",
      link: job.link,
      source: "We Work Remotely",
    }));
  } catch (error) {
    console.error("❌ Error fetching We Work Remotely jobs:", error.message);
    return [];
  }
};

const fetchAllJobs = async () => {
  const [remoteOKJobs, remotiveJobs, wwrJobs] = await Promise.all([
    fetchRemoteOKJobs(),
    fetchRemotiveJobs(),
    fetchWWRJobs(),
  ]);

  const allJobs = [...remoteOKJobs, ...remotiveJobs, ...wwrJobs];
  return allJobs;
};

module.exports = { fetchAllJobs };
