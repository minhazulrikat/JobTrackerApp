let currentTab = "all";
let interviewCount = 0;
let rejectedCount = 0;
let totalCurrentTabJob = 0;
let totalJob = 0;
render();
setActiveUi("All-job-tab");
function getElement(id) {
  const element = document.getElementById(id);
  return element;
}

function render() {
  const jobContainer = getElement("job-container");
  jobContainer.innerHTML = "";
  totalJob = allData.length;
  const data = getFilteredJobs();
  totalCurrentTabJob = data.length;
  getElement("Total-job").innerText = `${totalCurrentTabJob} of ${totalJob} jobs`;
  getElement("Total-job-applied").innerText = totalJob;
  if (data.length === 0) {
    showNoJobPreview();
  } else {
    hideNoJobPreview();
  }

  for (const item of data) {
    const jobCard = document.createElement("div");
    const statusStyleMap = {
      "Not Applied": "text-info",
      interview: "text-success",
      rejected: "text-error",
    };

    jobCard.innerHTML = `<div id="${item.id}" class="bg-base-100 p-6 rounded-md ">
          <div class="flex justify-between items-center">
            <div class="flex flex-col">
              <h4 id="job-title" class="font-bold text-xl">
                ${item.jobTitle}
              </h4>
              <p id="job-role" class="text-gray-500 mb-5">
                ${item.jobRole}
              </p>
            </div>
            <span class="btn delete-btn"><i class=" fa-regular fa-trash-can"></i></span>
          </div>
          <p id="job-type" class="text-gray-500 mb-5">
            ${item.jobType}
          </p>
          <button
            id="job-status-btn"
            class="btn ${statusStyleMap[item.status]} btn-soft uppercase cursor-default translate-0"
          >
            ${item.status}
          </button>
 <p id="job-type" class="text-gray-500 mt-2 mb-5">
            ${item.jobDescription}
          </p>
          <div class="flex gap-2 mt-5">
            <button class="btn btn-outline btn-success uppercase ">
                interview
            </button>
            <button class="btn btn-outline btn-error uppercase ">
                Rejected
            </button>
          </div>
        </div>`;

    jobContainer.appendChild(jobCard);
    const interviewJob = allData.filter((item) => item.status == "interview");
    interviewCount = interviewJob.length;
    const rejectedJob = allData.filter((item) => item.status == "rejected");
    rejectedCount = rejectedJob.length;

    setCount();
  }
}
function getFilteredJobs() {
  if (currentTab == "all") {
    return allData;
  } else if (currentTab == "interview") {
    const interviewJob = allData.filter((item) => item.status == "interview");
    return interviewJob;
  } else if (currentTab == "rejected") {
    const rejectedJob = allData.filter((item) => item.status == "rejected");
    return rejectedJob;
  }
}
function changeStatus(cardId, newStatus) {
  const findCard = allData.find((item) => item.id === cardId);
  findCard.status = newStatus;
  render();
}

getElement("job-container").addEventListener("click", (event) => {
  const cardId = event.target.parentNode.parentNode.id;

  if (event.target.innerText == "INTERVIEW") {
    changeStatus(cardId, "interview");
  } else if (event.target.innerText == "REJECTED") {
    changeStatus(cardId, "rejected");
  }
});

getElement("All-job-tab").addEventListener("click", function () {
  currentTab = "all";
  setActiveUi("All-job-tab");
  render();
});
getElement("Interview-tab").addEventListener("click", function () {
  currentTab = "interview";
  setActiveUi("Interview-tab");
  render();
});
getElement("Rejected-tab").addEventListener("click", function () {
  currentTab = "rejected";
  setActiveUi("Rejected-tab");
  render();
});
function setActiveUi(id){
 getElement("All-job-tab").classList.remove("active-tab");
 getElement("Interview-tab").classList.remove("active-tab");
 getElement("Rejected-tab").classList.remove("active-tab");
 getElement(id).classList.add("active-tab");

}
function hideNoJobPreview() {
  const noPreview = getElement("no-job-preview");
  noPreview.classList.add("hidden");
  noPreview.classList.remove("flex");
}
function showNoJobPreview() {
  const noPreview = getElement("no-job-preview");
  noPreview.classList.remove("hidden");
  noPreview.classList.add("flex");
}
function setCount() {
  getElement("Interview-given").innerText = interviewCount;
  getElement("Rejected-job").innerText = rejectedCount;
}
getElement("job-container").addEventListener("click", (event) => {
  const deleteBtn = event.target.closest(".delete-btn").parentNode.parentNode.id;
  allData = allData.filter((item) => item.id != deleteBtn);
  render();
});


