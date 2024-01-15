window.onload = function () {
  if ((!sessionStorage.getItem('loggedInUser')) || (sessionStorage.getItem('accountType') !== 'Staff')) {
    
      window.location.href = 'login.html'; // Chuyển hướng về trang đăng nhập
    
  }
};

async function getAllPatientsInfo() {
  const allPatientsInfo = document.getElementById('allPatientsInfo');
  try {
    const response = await fetch('http://localhost:3000/getAllPatientsInfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json();
    if (response.status === 200) {
      // Xử lý dữ liệu nhận được từ server

      allPatientsInfo.innerHTML = ''; // Xóa nội dung cũ trước khi thêm thông tin mới

      const patientsTable = document.createElement('table');
      patientsTable.setAttribute('id', 'patientsTable')

      // Create table header
      const headerRow = document.createElement('tr');
      headerRow.innerHTML = `
  <th>Patient Name</th>
  <th>Phone Number</th>
  <th>Date of Birth</th>
  <th>Address</th>
`;

      patientsTable.appendChild(headerRow);

      data.forEach(patient => {
        const date = new Date(patient.patientDateOfBirth);
        const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;

        // Create a new row for each patient
        const row = document.createElement('tr');
        row.innerHTML = `
    <td>${patient.patientFullName}</td>
    <td>${patient.patientPhoneNumber}</td>
    <td>${formattedDate}</td>
    <td>${patient.patientAddress}</td>
  `;

        // Append the row to the table
        patientsTable.appendChild(row);
      });
      allPatientsInfo.appendChild(patientsTable)
    } else {

      allPatientsInfo.innerHTML = data.message;
    }
  } catch (error) {

    console.error('Có lỗi xảy ra khi lấy thông tin bệnh nhân', error);
    allPatientsInfo.innerHTML = data.message;
  };
}

async function getPatientInfo(patientPhoneNumber) {
  const patientInfo = document.getElementById('getPatientInfo');
  try {
    const response = await fetch('http://localhost:3000/getPatientInfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ patientPhoneNumber })
    })
    const data = await response.json();
    if (response.status === 200) {
      const date = new Date(data.patientDateOfBirth);
      const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;

      const patientTable = document.createElement('table');
      patientTable.setAttribute('id', 'patientsTable');

      const headerRow = document.createElement('tr');
      headerRow.innerHTML = `
        <th>Patient Name</th>
        <th>Patient phone number</th>
        <th>Date of Birth</th>
        <th>Address</th>
      `;

      patientTable.appendChild(headerRow);

      // Iterate through the rows and create table cells
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${data.patientFullName}</td>
        <td>${data.patientPhoneNumber}</td>
        <td>${formattedDate}</td>
        <td>${data.patientAddress}</td>
      `;
      patientTable.appendChild(tr);

      // Append the table to the patientInfo element
      patientInfo.innerHTML = `
        <h3>Patient information</h3>
      `;

      patientInfo.appendChild(patientTable);
    } else {
      patientInfo.innerHTML = data.message;
    }
  } catch (error) {
    console.error('Có lỗi xảy ra khi lấy thông tin bệnh nhân', error);
    patientInfo.innerHTML = data.message;
  };
}

async function addPatientInfo(patientFullName, patientPhoneNumber, patientPassword, patientDateOfBirth, patientAddress) {
  const patientAddResult = document.getElementById('patientAddResult');
  try {
    const response = await fetch('http://localhost:3000/addPatientInfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ patientFullName, patientPhoneNumber, patientPassword, patientDateOfBirth, patientAddress })
    })
    const data = await response.json();
    if (response.status === 200) {
      patientAddResult.textContent = data.message;
    } else if (response.status === 500) {
      patientAddResult.textContent = data.message;
    }
  } catch (error) {
    patientAddResult.textContent = data.message;
    console.error('Có lỗi xảy ra:', error);
  }
}

async function displayAvailableDentist(appointmentDate, appointmentTime) {
  try {
    const response = await fetch('http://localhost:3000/displayAvailableDentist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ appointmentDate, appointmentTime })
    })
    const data = await response.json()
    // Xử lý dữ liệu nhận được từ server
    const displayAvailableDentist = document.getElementById('displayAvailableDentist');
    displayAvailableDentist.innerHTML = ''; // Xóa nội dung cũ trước khi thêm thông tin mới
    // const defaultOption = document.createElement('option');
    // displayAvailableDentist.appendChild(defaultOption);
    if (response.status === 200) {
      data.forEach(dentist => {
        const option = document.createElement('option');
        option.value = dentist.dentistUserName;
        option.textContent = dentist.dentistFullName;
        displayAvailableDentist.appendChild(option);
      });
    } else {
      const option = document.createElement('option');
      option.textContent = ' ';
      displayAvailableDentist.appendChild(option);
    }
  } catch (error) {
    console.error('Có lỗi xảy ra:', error);
  };

}

async function addMedicalRegisterForm(patientFullName, medicalPatientPhoneNumber, patientDateOfBirth, patientAddress, appointmentDate, appointmentTime, dentistUserName) {
  try {
    const response = await fetch('http://localhost:3000/addMedicalRegisterForm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ patientFullName, medicalPatientPhoneNumber, patientDateOfBirth, patientAddress, appointmentDate, appointmentTime, dentistUserName })
    })
    const data = await response.json();
    if (response.status === 200) {
      registerMedicalFormResult.innerHTML = data.message;
    } else if (response.status === 401) {
      const date = new Date(data.appointmentDate);
      const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
      const time = new Date(data.appointmentTime);
      const formattedTime = `${time.getUTCHours().toString().padStart(2, '0')}:${time.getUTCMinutes().toString().padStart(2, '0')}`;
      registerMedicalFormResult.innerHTML = `  
                                          <h3>Đã có lịch hẹn vào thời gian này:</h3>
                                          <p>Appointment ID: ${data.appointmentId}</p>
                                          <p>Patient phone number: ${data.patientPhoneNumber}</p>
                                          <p>Appointment date: ${formattedDate}</p>
                                          <p>Appointment time: ${formattedTime}</p>
                                          <p>Dentist full name: ${data.dentistFullName}</p>
                                          `;
    } else if (response.status === 500) {
      registerMedicalFormResult.innerHTML = data.message;
    }
  } catch (error) {
    console.error('Có lỗi xảy ra:', error);
  };
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

function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

module.exports = { getAllPatientsInfo, getPatientInfo, addPatientInfo, displayAvailableDentist, addMedicalRegisterForm, openTab, closeModal };
