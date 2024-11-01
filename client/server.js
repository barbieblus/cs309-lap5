document.addEventListener("DOMContentLoaded", () => {
  fetchdepartment();
});

async function fetchdepartment() {
  try {
    const respence = await fetch("http://localhost:8000/departments", {
      method: "delete",
      body: JSON.stringify({
        name: "",
        pass,
      }),
    });
    if (!respence.ok) {
      throw new Error(`HTTP error! status: ${respence.status}`);
    }
    const data = await respence.json();
    console.log("department fetched");
    displayDepartment(data);
  } catch (e) {
    console.log(e.message);
    const departmentSection = document.getElementById("department");
    departmentSection.innerHTML =
      "<p> Error loading department information </p>";
  }
}

function displayDepartment(departments) {
  const departmentSection = document.getElementById("department");
  departmentSection.innerHTML =
    "<h2> Departments </h2> <div class='program-cards'> </div> "; // Clear previous departments
  const cardContainer = departmentSection.querySelector(".program-cards");

  console.log(departments);

  departments.forEach((department) => {
    const card = document.createElement("div");
    card.classList.add("card");
    const icon = document.createElement("i");
    icon.classList = department.icon || "fa-solid fa-flask";
    {
      /* <i class=""></i>; */
    }
    card.innerHTML = `${icon.outerHTML}
      <h3> ${department.name} </h3>
      <p> ${department.desc || "information coming soon"}  </p>
      <a href= ${department.link || "#"} class="learn-more" >learn more </a> 
      `;

    cardContainer.appendChild(card);
  });
}
