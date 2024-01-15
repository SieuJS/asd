window.onload = function() {
    if ((!sessionStorage.getItem('loggedInUser')) || (sessionStorage.getItem('accountType') !== 'Dentist')) {
        window.location.href = 'login.html'; // Chuyển hướng về trang đăng nhập
    }
};

async function searchService(serviceName) {
    try {
        const response = await fetch('http://localhost:3000/searchService', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ serviceName })
        })
        const data = await response.json();
        const searchServiceResult = document.getElementById('searchServiceResult');
        searchServiceResult.innerHTML = '';
        if (response.status === 200) {  
            const resultHTML = data.map(service => {
                return `
                  <div>
                    <p>Service ID: ${service.serviceId}</p>
                    <p>Service name: ${service.serviceName}</p>
                    <button onclick="addService('${service.serviceId}','${service.serviceName}')">Add service</button>
                  </div>
                `;
              }).join('');
              searchServiceResult.innerHTML = resultHTML;                                
        } else if (response.status === 404) {
            searchServiceResult.textContent = data.message;
        }    
    } catch (error) {
        console.error('Có lỗi xảy ra:', error);
    }  
}

async function searchDrug(drugName) {
    try {
        const response = await fetch('http://localhost:3000/searchDrug', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ drugName })
        })
        const data = await response.json();
        const searchDrugResult = document.getElementById('searchDrugResult');
        searchDrugResult.innerHTML = '';
        if (response.status === 200) {  
            const resultHTML = data.map(drug => {
                return `
                <div>
                    <p>Drug ID: ${drug.drugId}</p>
                    <p>Drug name: ${drug.drugName}</p>
                    <p>Stock number: ${drug.stockNumber}</p>
                    <label for="quantity_${drug.drugId}">Quantity:</label>
                    <input type="number" id="quantity_${drug.drugId}" min="1" max="${drug.stockNumber}" required>
                    <button onclick="addDrug('${drug.drugId}','${drug.drugName}')">Add drug</button>
                </div>
                `;
              })
              console.log(data);
              searchDrugResult.innerHTML = resultHTML;  
        } else if (response.status === 404) {
            searchDrugResult.textContent = data.message;
        }    
    } catch (error) {
        console.error('Có lỗi xảy ra:', error);
    }  
}
    
let selectedServicesId = [];
let selectedServicesName = [];
async function addService(serviceId, serviceName) {
    selectedServicesId.push(serviceId);
    selectedServicesName.push(serviceName);

    const addServiceResult = document.getElementById('addServiceResult');
    addServiceResult.innerHTML = '';
    addServiceResult.innerHTML = 'Thêm dịch vụ thành công'; 
    setTimeout(`addServiceResult.style.display = 'none'`, 3000);
    
    const servicesList = document.getElementById('servicesList');
    servicesList.innerHTML = '';
    const selectedServicesInfo = selectedServicesId.map((serviceId, index) => ({
        serviceId,
        serviceName: selectedServicesName[index]
    }));

    // Hiển thị danh sách thuốc đã chọn
    const selectedServicesHTML = selectedServicesInfo.map(service => {
    return `
      <tr>
        <td>${service.serviceId}</td>
        <td>${service.serviceName}</td>
      </tr>
    `;
    }).join('');
  
    // Hiển thị bảng danh sách thuốc đã chọn
    const selectedServicesTable = `
        <table>
        <tr>
            <th>Service ID</th>
            <th>Service Name</th>
        </tr>
        ${selectedServicesHTML}
        </table>
    `;
    console.log(selectedServicesInfo);
    // Hiển thị bảng danh sách thuốc đã chọn trong HTML
    servicesList.innerHTML = selectedServicesTable;
}

let selectedDrugsId = [];
let selectedDrugsName = [];
let selectedDrugsQuantity = [];
async function addDrug(drugId, drugName) {
    selectedDrugsId.push(drugId);
    selectedDrugsName.push(drugName);

    const quantity = document.getElementById(`quantity_${drugId}`).value;
    selectedDrugsQuantity.push(quantity);

    const addDrugResult = document.getElementById('addDrugResult');
    addDrugResult.innerHTML = '';
    addDrugResult.innerHTML = 'Thêm dịch vụ thành công'; 
    setTimeout(`addDrugResult.style.display = 'none'`, 3000);
    
    const drugsList = document.getElementById('drugsList');
    drugsList.innerHTML = '';
    // Tạo mảng thông tin thuốc đã chọn
    const selectedDrugsInfo = selectedDrugsId.map((drugId, index) => ({
        drugId,
        drugName: selectedDrugsName[index],
        quantity: selectedDrugsQuantity[index],
    }));

    // Hiển thị danh sách thuốc đã chọn
    const selectedDrugsHTML = selectedDrugsInfo.map(drug => {
    return `
      <tr>
        <td>${drug.drugId}</td>
        <td>${drug.drugName}</td>
        <td>${drug.quantity}</td>
      </tr>
    `;
    }).join('');
  
    // Hiển thị bảng danh sách thuốc đã chọn
    const selectedDrugsTable = `
        <table>
        <tr>
            <th>Drug ID</th>
            <th>Drug Name</th>
            <th>Quantity</th>
        </tr>
        ${selectedDrugsHTML}
        </table>
    `;
    // Hiển thị bảng danh sách thuốc đã chọn trong HTML
    console.log(selectedDrugsInfo);
    drugsList.innerHTML = selectedDrugsTable;
    // drugsInfo = selectedDrugsInfo;
    // return drugsInfo;
}

async function addPatientMedicalRecord(patientPhoneNumber, examinationDate, examinationTime, servicesId, drugsId, drugsQuantity ) {
    try {
        const response = await fetch('http://localhost:3000/addPatientMedicalRecord', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ patientPhoneNumber, examinationDate, examinationTime, servicesId, drugsId, drugsQuantity})
        })
        const data = await response.json();
        if (response.status === 200) {
            patientMedicalRecordAddResult.textContent = data.message;
        } else if (response.status === 500) {
            patientMedicalRecordAddResult.textContent = data.message;

        }    
    } catch (error) {
        console.error('Có lỗi xảy ra:', error);
    }  
}

async function checkAppointmentsListByDate(dentistUserName,selectedDate) {
    try {
        const response = await fetch('http://localhost:3000/checkAppointmentsListByDate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({dentistUserName, selectedDate})
        })
        const data = await response.json();
        if (response.status === 200) {        
            const checkAppointmentsListByDateResult = document.getElementById('checkAppointmentsListByDateResult');
            checkAppointmentsListByDateResult.innerHTML = '';  
            const appointmentDetails = document.createElement('table');
            appointmentDetails.setAttribute('id','Table');
      
            const headerRow = document.createElement('tr');
            headerRow.innerHTML = `
            <th>Appointment Id</th>
            <th>Patient Phone Number</th>
            <th>Date</th>
            <th>Time</th>
            <th>Dentist</th>;`
      
            appointmentDetails.appendChild(headerRow);
            const row = document.createElement('tr');
            data.forEach(appointment => {
                const date = new Date(appointment.appointmentDate);
                const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
                const time = new Date(appointment.appointmentTime); 
                const formattedTime = `${time.getUTCHours().toString().padStart(2, '0')}:${time.getUTCMinutes().toString().padStart(2, '0')}`;
                const checkAppointmentsListByDateResultDeTails = document.createElement('p');
                row.innerHTML = `<td>${appointment.appointmentId}</td>
                <td> ${appointment.patientPhoneNumber} </td>
                <td> ${formattedDate} </td>
                <td> ${formattedTime} </td>
                <td>${appointment.dentistFullName}</td>
                `;
                appointmentDetails.appendChild(row);
                checkAppointmentsListByDateResult.appendChild(appointmentDetails);
            checkAppointmentsListByDateResult.appendChild(checkAppointmentsListByDateResultDeTails) 
            });
        } else {
            const checkAppointmentsListByDateResult = document.getElementById('checkAppointmentsListByDateResult');
            checkAppointmentsListByDateResult.innerHTML = data.message;
        }
    } catch (error) {
        console.error('Có lỗi xảy ra:', error);
    }
}

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }


module.exports = { addPatientMedicalRecord , checkAppointmentsListByDate, searchService, searchDrug, addService, addDrug, openTab};

module.exports = {selectedServicesId, selectedServicesName, selectedDrugsId, selectedDrugsName, selectedDrugsQuantity};
