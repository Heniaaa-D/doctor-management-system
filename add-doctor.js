const saveDoctorBtn = document.querySelector(".save-doctor-button");
const userName = document.querySelector(".doctors-name");
const lastName = document.querySelector(".doctors-lastname");
const emailInput = document.querySelector(".doctors-email-address");
const specialtyInput = document.querySelector(".doctors-specialty");
const statusInput = document.querySelector(".doctors-status");
const phoneNumberInput = document.querySelector(".doctors-phone-number");
const preview = document.getElementById("doctorPreview");
const noName = document.querySelector(".name");
const noLastname = document.querySelector(".Lname");
const noEmail = document.querySelector(".email");
const noPhoneN = document.querySelector(".phoneN");
const noSpecialty = document.querySelector(".specialty");
const noStatus = document.querySelector(".status");
const noImage = document.querySelector(".no-image");
const imageBox = document.getElementById("imageBox");
const uploadEmpty = document.getElementById("uploadLabelEmpty");
const uploadHover = document.getElementById("uploadLabelHover");
const doctorImage = document.getElementById("doctorImage");

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

const getImageBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const getDate = () => new Date().toISOString().split("T")[0];
const getTime = () => new Date().toTimeString().slice(0, 5);

const checkInput = (input, requiredElement) => {
  if (!input.value) {
    input.classList.add("active");
    imageBox.classList.add("border-error");

    requiredElement.classList.remove("hidden");
  } else {
    input.classList.remove("active");
    requiredElement.classList.add("hidden");
  }
};

saveDoctorBtn.addEventListener("click", async () => {
  checkInput(userName, noName);
  checkInput(lastName, noLastname);
  checkInput(emailInput, noEmail);
  checkInput(specialtyInput, noSpecialty);
  checkInput(statusInput, noStatus);
  checkInput(phoneNumberInput, noPhoneN);

  if (!doctorImage.files.length) {
    imageBox.classList.add("border-error");
    noImage.classList.remove("hidden");
    return;
  } else {
    imageBox.classList.remove("border-error");
    noImage.classList.add("hidden");
  }

  if (
    !userName.value ||
    !lastName.value ||
    !emailInput.value ||
    !specialtyInput.value ||
    !statusInput.value ||
    !phoneNumberInput.value
  ) {
    return;
  }
  const doctors = JSON.parse(localStorage.getItem("doctorsData")) || [];
  const file = doctorImage.files[0];
  let image = "";
  if (file) {
    image = await getImageBase64(file);
  }
  const newDoctor = {
    id: Date.now(),
    name: userName.value,
    surname: lastName.value,
    email: emailInput.value,
    phone: phoneNumberInput.value,
    specialization: specialtyInput.value,
    status: statusInput.value,
    createdDate: getDate(),
    createdTime: getTime(),
    image,
  };
  doctors.unshift(newDoctor);
  localStorage.setItem("doctorsData", JSON.stringify(doctors));
  window.location.href = "doctors-list.html";
});
