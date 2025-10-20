var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var wrongData = document.getElementById("wrongData");
var closeBtn = document.getElementById("closeBtn");
bookMark = [];

if (localStorage.getItem("storage") == null) {
  bookMark = [];
} else {
  bookMark = JSON.parse(localStorage.getItem("storage"));
  displaySite();
}

function addSite() {
  if (validateSiteName() == true && validateUrl() == true) {
    var sites = {
      name: siteName.value,
      url: siteUrl.value,
    };
    bookMark.push(sites);
    localStorage.setItem("storage", JSON.stringify(bookMark));
    displaySite();
    clearSiteData();
  } else {
    wrongData.classList.replace("d-none", "d-block");
  }
}
function clearSiteData() {
  siteName.value = null;
  siteUrl.value = null;
}

function displaySite() {
  cartona = "";
  for (var i = 0; i < bookMark.length; i++) {
    cartona += `<tr class="border-bottom">
                <td>${i + 1}</td>
                <td>${bookMark[i].name}</td>
                <td class="p-2">
                   <a
                    href="http://${bookMark[i].url}"
                    target="_blank"
                    class="text-decoration-none text-white btn btn-success"
                    ><i class="fa-solid fa-eye"></i> Visit</a
                  >
                </td>
                <td>
                  <button onclick = "deleteSite(${i})" class="btn btn-danger">
                    <i class="fa-solid fa-trash-can"></i>
                    Delete
                  </button>
                </td>
              </tr>`;
  }
  document.getElementById("siteData").innerHTML = cartona;
}

function deleteSite(index) {
  bookMark.splice(index, 1);
  localStorage.setItem("storage", JSON.stringify(bookMark));
  displaySite();
}

function validateSiteName() {
  var siteNameRegax = /^[a-z]{3,20}$/i;
  var siteNameTest = siteName.value;
  if (siteNameRegax.test(siteNameTest) == true) {
    siteName.classList.add("is-valid");
    siteName.classList.remove("is-invalid");
    return true;
  } else {
    siteName.classList.remove("is-valid");
    siteName.classList.add("is-invalid");
    return false;
  }
}

function validateUrl() {
  var siteUrlRegax = /^[w]{3}\.[a-z]{2,20}\.(com){1}$/i;
  var siteUrlTest = siteUrl.value;
  if (siteUrlRegax.test(siteUrlTest) == true) {
    siteUrl.classList.add("is-valid");
    siteUrl.classList.remove("is-invalid");
    return true;
  } else {
    siteUrl.classList.remove("is-valid");
    siteUrl.classList.add("is-invalid");
    return false;
  }
}

// We coverd the DOM in the last session
closeBtn.addEventListener("click", function () {
  wrongData.classList.add("d-none");
});
