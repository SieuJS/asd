async function Login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  console.log('log')
  try {
    const response = await fetch(`http://localhost:3000/Login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    if (response.status === 200) {
      if (data === 'Admin') {
          sessionStorage.setItem('loggedInUser', username);
          sessionStorage.setItem('accountType', 'Admin');
          window.location.href = 'admin.html';
      } else if (data === 'Staff') {
          sessionStorage.setItem('loggedInUser', username);
          sessionStorage.setItem('accountType', 'Staff');
          window.location.href = 'staff.html';
      } else if (data === 'Dentist') {
          sessionStorage.setItem('loggedInUser', username);
          sessionStorage.setItem('accountType', 'Dentist');
          window.location.href = 'dentist.html';  
      } else if (data === 'Patient') {
          sessionStorage.setItem('loggedInUser', username);
          sessionStorage.setItem('accountType', 'Patient');
          window.location.href = 'patient.html'; 
      } else if (data === 'Locked') {
          alert('Tài khoản đã bị khóa!');
      }
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error('Có lỗi xảy ra:', error);
  }
}

async function patientRegister() {
  const addResult = document.getElementById('addResult');
  const patientFullName = document.getElementById('registerPatientFullName').value;
  const patientPhoneNumber = document.getElementById('registerPatientPhoneNumber').value;
  const patientPassword = document.getElementById('registerPatientPassword').value;
  const patientDateOfBirth = document.getElementById('registerPatientDateOfBirth').value;
  const patientAddress = document.getElementById('registerPatientAddress').value;
  try {
    const response = await fetch(`http://localhost:3000/patientRegister`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ patientFullName, patientPhoneNumber, patientPassword, patientDateOfBirth, patientAddress })
    });
    const data = await response.json();
        if (response.status === 200) {
          addResult.textContent = data.message;
        } else if (response.status === 500) {
            addResult.textContent = data.message;
        }
  } catch (error) {
      console.error('Có lỗi xảy ra:', error);
      addResult.textContent = 'Đã xảy ra lỗi trong quá trình đăng ký.';
  }
}

// // adminLogin, patientLogin,
// module.exports =  { Login,  patientRegister};