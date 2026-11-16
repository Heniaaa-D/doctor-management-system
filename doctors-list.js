const doctorListEmpty = document.querySelector(".doctor-list-empty");
const addDoctorBtn = document.querySelector(".add-doctor-button");
const container = document.querySelector(".doctors-list-container");
const doctorsCountContainer = document.querySelector(
  ".doctors-count-container",
);
const totalDoctors = document.querySelector(".total-doctors");

const getDoctors = () => {
  const doctorsData = localStorage.getItem("doctorsData") || "[]";
  return JSON.parse(doctorsData);
};

const setDoctorCount = (list) => {
  const doctorsCount = list.length;
  totalDoctors.innerHTML = doctorsCount;

  if (doctorsCount === 0) {
    doctorListEmpty.classList.remove("hidden");
  }
};

const displayDoctors = (doctor) => {
  const parsedDoctorsData = getDoctors();
  setDoctorCount(parsedDoctorsData);
  parsedDoctorsData.map((doctor) => {
    const tr = document.createElement("tr");
    tr.setAttribute("id", doctor.id);

    const doctorElement = `
            <td class="pt-7.5 ">
                <div class="flex pl-5 gap-3.5 items-center">
                   <img class="doctor-photo w-20 h-20 object-cover " src="${doctor.image}"/>
                  <div class="flex flex-col">
                    <p class="font-semibold text-[14px] text-midnight-gray">
                      ${doctor.name}
                    </p>
                    <p class="text-gray-muted text-[13px] font-medium">
                     ${doctor.specialization}
                    </p>
                  </div>
                </div>
              </td>

                <td class="text-[14px] font-semibold text-midnight-gray pt-7.5">
                ${doctor.id}
              </td>
              
              <td class="text-[14px] font-semibold text-midnight-gray pt-7.5">
                ${doctor.email}
              </td>
              <td class="text-[14px] font-semibold text-midnight-gray pt-7.5">
                ${doctor.phone}
              </td>
              <td class="pt-7.5">
                <div class="flex flex-col">
                  <p class="text-[14px] font-semibold text-midnight-gray">
                    ${doctor.createdDate}
                  </p>
                  <p class="text-gray-muted text-[13px] font-medium">
                    ${doctor.createdTime}
                  </p>
                </div>
              </td>
              <td class="pt-7.5">
                <button
                  class="${doctor.status === "Approved" ? "bg-green-lite text-green" : "redStatus"} text-[11px] font-medium py-1.5 px-2.5 rounded-md"
                >
                  ${doctor.status}
                </button>
              </td>
              <td class="pt-7.5">
                <button onclick="editDoctor(${doctor.id})"  class="p-1.5 rounded-md bg-grey-lite text-gray-400 cursor-pointer edit-btn">
                  <i class="fa-solid fa-pen w-5 h-5"></i>
                </button>
                <button onclick="deleteDoctor(${doctor.id})" class="p-1.5 rounded-md bg-grey-lite text-gray-400 cursor-pointer delete-button">
                <i class="fa-solid fa-trash"></i></button>
              </td>
          
   `;
    tr.innerHTML = doctorElement;
    container.appendChild(tr);
  });
};

const deleteDoctor = (id) => {
  const isConfirmed = confirm("Are you sure you want to delete this doctor?");
  if (!isConfirmed) return;
  const currentDoctor = document.getElementById(id);
  currentDoctor.remove();
  const parsedDoctors = getDoctors();
  const filteredDoctors = parsedDoctors.filter((doctor) => doctor.id != id);
  setDoctorCount(filteredDoctors);

  if (filteredDoctors.length === 0) {
    doctorListEmpty.classList.remove("hidden");
  }

  const stringifiedDoctors = JSON.stringify(filteredDoctors);

  localStorage.setItem("doctorsData", stringifiedDoctors);
};

document.addEventListener("DOMContentLoaded", displayDoctors);

const editDoctor = (id) => {
  window.location.href = `edit-doctor.html?id=${id}`;
};
