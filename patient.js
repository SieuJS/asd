async function updatePatientInfo() {
  const patientUpdateResult = document.getElementById('patientUpdateResult');
  const patientFullName = document.getElementById('updatePatientFullName').value;
  const patientPhoneNumber = document.getElementById('updatePatientPhoneNumber').value;
  const patientPassword = document.getElementById('updatePatientPassword').value;
  const patientDateOfBirth = document.getElementById('updatePatientDateOfBirth').value;
  const patientAddress = document.getElementById('updatePatientAddress').value;

  try {
    const response = await fetch('http://localhost:3000/updatePatientInfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({  patientFullName, patientPhoneNumber, patientPassword, patientDateOfBirth, patientAddress })
    })
    const data = await response.json();
    if (response.status === 200) {
      patientUpdateResult.textContent = data.message;
    } else if (response.status === 404) {
      patientUpdateResult.textContent = data.message;
    } else if (response.status === 500) {
      patientUpdateResult.textContent = data.message;
    }
  } catch (error) {
    console.error('Có lỗi xảy ra:', error);
  };
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

async function scheduleAppointment(patientPhoneNumber, appointmentDate, appointmentTime, dentistUserName) {
  try {
    const response = await fetch('http://localhost:3000/scheduleAppointment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ patientPhoneNumber, appointmentDate, appointmentTime, dentistUserName })
    })
    const data = await response.json();
    const scheduleAppointmentResult = document.getElementById('scheduleAppointmentResult');
    scheduleAppointmentResult.innerHTML = '';
    if (response.status === 200) {
      scheduleAppointmentResult.innerHTML = data.message;
    } else if (response.status === 401) {
      const date = new Date(data.appointmentDate);
      const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
      const time = new Date(data.appointmentTime);
      const formattedTime = `${time.getUTCHours().toString().padStart(2, '0')}:${time.getUTCMinutes().toString().padStart(2, '0')}`;
      scheduleAppointmentResult.innerHTML = `  
                                        <h3>Bạn đã có lịch hẹn vào thời gian này:</h3>
                                        <p>Appointment ID: ${data.appointmentId}</p>
                                        <p>Patient phone number: ${data.patientPhoneNumber}</p>
                                        <p>Appointment date: ${formattedDate}</p>
                                        <p>Appointment time: ${formattedTime}</p>
                                        <p>Dentist full name: ${data.dentistFullName}</p>
                                        `;
    } else if (response.status === 500) {
      scheduleAppointmentResult.innerHTML = data.message;
    }
  } catch (error) {
    console.error('Có lỗi xảy ra:', error);
  };
}

async function getAllAppointmentsInfo(patientPhoneNumber) {
  try {
    const response = await fetch('http://localhost:3000/getAllAppointmentsInfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ patientPhoneNumber })
    })
    const data = await response.json();
    const getAllAppointmentsInfoResult = document.getElementById('getAllAppointmentsInfoResult');
    getAllAppointmentsInfoResult.innerHTML = '';
    if (response.status === 200) {
      // Assuming you have a table element with the id 'appointmentsTable' in your HTML
      const appointmentsTable = document.createElement('appointmentsTable');
      appointmentsTable.id = 'appointmentsTable'

      // Create table header
      const headerRow = document.createElement('tr');
      headerRow.innerHTML = `
        <th>Appointment ID</th>
        <th>Patient Phone Number</th>
        <th>Appointment Date</th>
        <th>Appointment Time</th>
        <th>Dentist Full Name</th>
      `;

      appointmentsTable.appendChild(headerRow);

      // Iterate through the appointments data
      data.forEach(appointment => {
        const date = new Date(appointment.appointmentDate);
        const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
        const time = new Date(appointment.appointmentTime);
        const formattedTime = `${time.getUTCHours().toString().padStart(2, '0')}:${time.getUTCMinutes().toString().padStart(2, '0')}`;

        // Create a new row for each appointment
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${appointment.appointmentId}</td>
          <td>${appointment.patientPhoneNumber}</td>
          <td>${formattedDate}</td>
          <td>${formattedTime}</td>
          <td>${appointment.dentistFullName}</td>
        `;

        // Append the row to the table
        appointmentsTable.appendChild(row);
      });
      getAllAppointmentsInfoResult.appendChild(appointmentsTable)
    } else {
      getAllAppointmentsInfoResult.innerHTML = data.message;
    }
  } catch (error) {
    console.error('Có lỗi xảy ra khi lấy thông tin lịch hẹn', error);
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

function openModal() {
  document.getElementById("myModal").style.display = "block";
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

module.exports = { updatePatientInfo, displayAvailableDentist, scheduleAppointment, getAllAppointmentsInfo, openTab, openModal, closeModal };
