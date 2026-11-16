const saveChangesBtn = document.querySelector(".edit-doctor-button");
const doctorsName = document.querySelector(".doctors-name");
const doctorsLastname = document.querySelector(".doctors-lastname");
const doctorsEmailAddress = document.querySelector(".doctors-email-address");
const doctorsPhoneNumber = document.querySelector(".doctors-phone-number");
const doctorsSpecialization = document.querySelector(".doctors-specialty");
const doctorsStatus = document.querySelector(".doctors-status");
const doctorImage = document.getElementById("doctorImage");
const preview = document.getElementById("doctorPreview");
const imageBox = document.getElementById("imageBox");
const uploadEmpty = document.getElementById("uploadLabelEmpty");
const uploadHover = document.getElementById("uploadLabelHover");
const noImage = document.querySelector(".image");
const noName = document.querySelector(".name");
const noLastname = document.querySelector(".Lname");
const noEmail = document.querySelector(".email");
const noPhoneN = document.querySelector(".phoneN");
const noSpecialty = document.querySelector(".specialty");
const noStatus = document.querySelector(".status");

doctorImage.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = (event) => {
    preview.src = event.target.result;
    preview.classList.remove("hidden");

    uploadEmpty.classList.add("hidden");
    uploadHover.classList.remove("hidden");

    imageBox.classList.remove("border-error");
    noImage.classList.add("hidden");
  };

  reader.readAsDataURL(file);
});

const urlParams = new URLSearchParams(window.location.search);
const doctorId = urlParams.get("id");

const getDoctor = () => {
  const doctors = JSON.parse(localStorage.getItem("doctorsData")) || [];
  return doctors.find((d) => d.id == doctorId);
};

function getImageBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function loadSelectedDoctor() {
  const currentDoctor = getDoctor();

  doctorsName.value = currentDoctor.name;
  doctorsLastname.value = currentDoctor.surname;
  doctorsEmailAddress.value = currentDoctor.email;
  doctorsPhoneNumber.value = currentDoctor.phone;
  doctorsSpecialization.value = currentDoctor.specialization;
  doctorsStatus.value = currentDoctor.status;
  doctorImage.files.length = currentDoctor.image;

  if (currentDoctor?.image) {
    preview.src = currentDoctor.image;
    preview.classList.remove("hidden");

    uploadEmpty.classList.add("hidden");
    uploadHover.classList.remove("hidden");
  } else {
    uploadEmpty.classList.remove("hidden");
    uploadHover.classList.add("hidden");
  }
}

document.addEventListener("DOMContentLoaded", loadSelectedDoctor);

const checkInput = (input, requiredElement) => {
  if (!input.value) {
    input.classList.add("active");
    requiredElement.classList.remove("hidden");
  } else {
    input.classList.remove("active");
    requiredElement.classList.add("hidden");
  }
};

saveChangesBtn.addEventListener("click", async () => {
  checkInput(doctorsName, noName);
  checkInput(doctorsLastname, noLastname);
  checkInput(doctorsEmailAddress, noEmail);
  checkInput(doctorsSpecialization, noSpecialty);
  checkInput(doctorsStatus, noStatus);
  checkInput(doctorsPhoneNumber, noPhoneN);

  const currentDoctor = getDoctor();

  if (!currentDoctor.image) {
    imageBox.classList.add("border-error");
    noImage.classList.remove("hidden");
    return;
  } else {
    imageBox.classList.remove("border-error");
    noImage.classList.add("hidden");
  }

  if (
    !doctorsName.value ||
    !doctorsLastname.value ||
    !doctorsEmailAddress.value ||
    !doctorsSpecialization.value ||
    !doctorsStatus.value ||
    !doctorsPhoneNumber.value
  ) {
    return;
  }

  const file = doctorImage.files[0];

  let image = currentDoctor.image;

  if (file) {
    image = await getImageBase64(file);
  }

  const doctors = JSON.parse(localStorage.getItem("doctorsData")) || [];

  const updatedDoctors = doctors.map((doctor) => {
    if (doctor.id == doctorId) {
      return {
        ...doctor,
        name: doctorsName.value,
        surname: doctorsLastname.value,
        email: doctorsEmailAddress.value,
        phone: doctorsPhoneNumber.value,
        specialization: doctorsSpecialization.value,
        status: doctorsStatus.value,
        image,
      };
    }
    return doctor;
  });

  localStorage.setItem("doctorsData", JSON.stringify(updatedDoctors));
  window.location.href = "doctors-list.html";
});
