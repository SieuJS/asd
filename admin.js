window.onload = function() {
    if ((!sessionStorage.getItem('loggedInUser')) || (sessionStorage.getItem('accountType') !== 'Admin')) {
        
            window.location.href = 'login.html'; // Chuyển hướng về trang đăng nhập
       
    }
};

//staff
async function getAllStaffsInfo() {
    const allStaffsInfo = document.getElementById('allStaffsInfo');
    try {
        const response = await fetch('http://localhost:3000/getAllStaffsInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json();
        if (response.status === 200) {            
            allStaffsInfo.innerHTML = ''; 

      const staffsTable = document.createElement('table');
      staffsTable.setAttribute('id', 'Table')

      // Create table header
      const headerRow = document.createElement('tr');
      headerRow.innerHTML = `
        <th>Staff User Name</th>
        <th>Password</th>
        <th>Staff Name</th>`;

        staffsTable.appendChild(headerRow);
        
        data.forEach(staff => {
          // Create a new row for each staff
          const row = document.createElement('tr');
          row.innerHTML = `
      <td>${staff.staffUserName}</td>
      <td>${staff.staffPassword}</td>
      <td>${staff.staffFullName}</td>
    `;
  
          // Append the row to the table
          staffsTable.appendChild(row);
        });
        allStaffsInfo.appendChild(staffsTable)
      } else {
  
        allStaffsInfo.innerHTML = data.message;
      }
    } catch (error)  {
        allStaffsInfo.innerHTML = data.message;
        console.error('Có lỗi xảy ra khi lấy thông tin nhân viên', error);
    };
}

async function getStaffInfo(staffUserName) {
    const staffInfo = document.getElementById('getStaffInfo');
    try {
        const response = await fetch('http://localhost:3000/getStaffInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ staffUserName }) 
        })
        const data = await response.json();
        if (response.status === 200) {  
            staffInfo.innerHTML = ''; 

            const staffsTable = document.createElement('table');
            staffsTable.setAttribute('id', 'Table')
      
            // Create table header
            const headerRow = document.createElement('tr');
            headerRow.innerHTML = `
              <th>Staff User Name</th>
              <th>Password</th>
              <th>Staff Name</th>`;
      
              staffsTable.appendChild(headerRow);
              
                // Create a new row for each staff
                const row = document.createElement('tr');
                row.innerHTML = `
                <td>${data.staffUserName}</td>
                <td>${data.staffPassword}</td>
                <td>${data.staffFullName}</td>
            `;
        
                // Append the row to the table
                staffsTable.appendChild(row);
              
              staffInfo.appendChild(staffsTable)
            } else {
        
              staffInfo.innerHTML = data.message;
            }
    } catch (error) {
        staffInfo.innerHTML = data.message;
        console.error('Có lỗi xảy ra khi lấy thông tin nhân viên', error);
    };
}

async function addStaffInfo(staffFullName, staffUserName,  staffPassword) {
    const staffAddResult = document.getElementById('staffAddResult');
    try {
        const response = await fetch('http://localhost:3000/addStaffInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ staffFullName, staffUserName,  staffPassword})
        })
        const data = await response.json();
        if (response.status === 200) {
            staffAddResult.textContent = data.message;
        } else if (response.status === 500) {
            staffAddResult.textContent = data.message;
        }    
    } catch (error) {
        staffAddResult.textContent = data.message;
        console.error('Có lỗi xảy ra:', error);
    }  
}

//dentist
async function getAllDentistsInfo() {
    const allDentistsInfo = document.getElementById('allDentistsInfo');
    try {
        const response = await fetch('http://localhost:3000/getAllDentistsInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json();
        if (response.status === 200) {            
            allDentistsInfo.innerHTML = ''; 
            const dentistsTable = document.createElement('table');
      dentistsTable.setAttribute('id', 'Table')

      // Create table header
      const headerRow = document.createElement('tr');
      headerRow.innerHTML = `
        <th>Dentist User Name</th>
        <th>Password</th>
        <th>Dentist Name</th>`;

        dentistsTable.appendChild(headerRow);
        
        data.forEach(staff => {
          // Create a new row for each dentist
          const row = document.createElement('tr');
          row.innerHTML = `
      <td>${staff.dentistUserName}</td>
      <td>${staff.dentistPassword}</td>
      <td>${staff.dentistFullName}</td>
    `;
  
          // Append the row to the table
          dentistsTable.appendChild(row);
        });
        allDentistsInfo.appendChild(dentistsTable)
      } else {
  
        allDentistsInfo.innerHTML = data.message;
      }
    } catch (error)  {
        allDentistsInfo.innerHTML = data.message;
        console.error('Có lỗi xảy ra khi lấy thông tin nha sĩ', error);
    };
}

async function getDentistInfo(dentistUserName) {
    const dentistInfo = document.getElementById('getDentistInfo');
    try {
        const response = await fetch('http://localhost:3000/getDentistInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ dentistUserName }) 
        })
        const data = await response.json();
        if (response.status === 200) {  
            dentistInfo.innerHTML = ''; 
             

            const dentistsTable = document.createElement('table');
            dentistsTable.setAttribute('id', 'Table')
      
            // Create table header
            const headerRow = document.createElement('tr');
            headerRow.innerHTML = `
              <th>Dentist User Name</th>
              <th>Password</th>
              <th>Dentist Name</th>`;
      
              dentistsTable.appendChild(headerRow);
              
              
                // Create a new row for each dentist
                const row = document.createElement('tr');
                row.innerHTML = `
            <td>${data.dentistUserName}</td>
            <td>${data.dentistPassword}</td>
            <td>${data.dentistFullName}</td>
          `;
        
                // Append the row to the table
                dentistsTable.appendChild(row);
              
              dentistInfo.appendChild(dentistsTable)
            } else {
        
              dentistInfo.innerHTML = data.message;
            }
    } catch (error) {
        dentistInfo.innerHTML = data.message;
        console.error('Có lỗi xảy ra khi lấy thông tin nha sĩ', error);
    };
}

async function addDentistInfo(dentistFullName, dentistUserName,  dentistPassword) {
    const dentistAddResult = document.getElementById('dentistAddResult');
    try {
        const response = await fetch('http://localhost:3000/addDentistInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ dentistFullName, dentistUserName,  dentistPassword})
        })
        const data = await response.json();
        if (response.status === 200) {
            dentistAddResult.textContent = data.message;
        } else if (response.status === 500) {
            dentistAddResult.textContent = data.message;
        }    
    } catch (error) {
        dentistAddResult.textContent = data.message;
        console.error('Có lỗi xảy ra:', error);
    }  
}

async function getAllDrugsInfo() {
    const allDrugsInfo = document.getElementById('allDrugsInfo');
    try {
        const response = await fetch('http://localhost:3000/getAllDrugsInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json();
        if (response.status === 200) {            
            allDrugsInfo.innerHTML = ''; 
            const drugsTable = document.createElement('table');
            drugsTable.setAttribute('id', 'Table')
      
            // Create table header
            const headerRow = document.createElement('tr');
            headerRow.innerHTML = `
              <th>Drug ID</th>
              <th>Drug Name</th>
              <th>Indication</th>
              <th>Expired Date</th>
              <th>Unit</th>
              <th>Stock Number</th>
              <th>Price</th>`;
      
              drugsTable.appendChild(headerRow);
              
              data.forEach(drug => {
                const date = new Date(drug.expiredDate);
                const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
                // Create a new row for each drug
                const row = document.createElement('tr');
                row.innerHTML = `
            <td>${drug.drugId}</td>
            <td>${drug.drugName}</td>
            <td>${drug.indication}</td>
            <td>${formattedDate}</td>
            <td>${drug.unit}</td>
            <td>${drug.stockNumber}</td>
            <td>${drug.price + "$"}</td>
          `;
        
                // Append the row to the table
                drugsTable.appendChild(row);
              });
              allDrugsInfo.appendChild(drugsTable)
            } else {
        
              allDrugsInfo.innerHTML = data.message;
            }
    } catch (error)  {
        allDrugsInfo.innerHTML = data.message;
        console.error('Có lỗi xảy ra khi lấy thông tin thuốc', error);
    };
}

async function getDrugInfo(drugId) {
    const drugInfo = document.getElementById('getDrugInfo');
    try {
        const response = await fetch('http://localhost:3000/getDrugInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ drugId }) 
        })
        const data = await response.json();
        if (response.status === 200) {  
            drugInfo.innerHTML = ''; 
            const drugsTable = document.createElement('table');
            drugsTable.setAttribute('id', 'Table');

            
            // Create table header
            const headerRow = document.createElement('tr');
            headerRow.innerHTML = `
                <th>Drug ID</th>
                <th>Drug Name</th>
                <th>Indication</th>
                <th>Expired Date</th>
                <th>Unit</th>
                <th>Stock Number</th>
                <th>Price</th>`;
      
              drugsTable.appendChild(headerRow);
              
              
                // Create a new row for each drug
            const date = new Date(data.expiredDate);
            const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${data.drugId}</td>
                <td>${data.drugName}</td>
                <td>${data.indication}</td>
                <td>${formattedDate}</td>
                <td>${data.unit}</td>
                <td>${data.stockNumber}</td>
                <td>${data.price + "$"}</td>
            `;
                // Append the row to the table
                drugsTable.appendChild(row);
              
              drugInfo.appendChild(drugsTable)
            } else {
                drugInfo.innerHTML = data.message;
            }
    } catch (error) {
        drugInfo.innerHTML = data.message;
        console.error('Có lỗi xảy ra khi lấy thông tin thuốc', error);
    };
}
  
async function updateDrugInfo() {
    const drugUpdateResult = document.getElementById('drugUpdateResult');
    const drugId = document.getElementById('updateDrugId').value;
    const drugName = document.getElementById('updateDrugName').value;
    const unit = document.getElementById('updateUnit').value;
    const indication = document.getElementById('updateIndication').value;
    const expiredDate = document.getElementById('updateExpiredDate').value;
    const price = document.getElementById('updatePrice').value;

    try {
        const response = await fetch('http://localhost:3000/updateDrugInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ drugId, drugName, unit, indication, expiredDate, price})
        })
        const data = await response.json();
        if (response.status === 200) {
            drugUpdateResult.textContent = data.message;
        } else if (response.status === 404 ) {
            drugUpdateResult.textContent = data.message;
        } else if (response.status === 500) {
            drugUpdateResult.textContent = data.message;
        }
    } catch (error) {
        console.error('Có lỗi xảy ra', error);
    };
}

async function updateStockNumber() {
    const drugStockNumberUpdateResult = document.getElementById('drugStockNumberUpdateResult');
    const drugId = document.getElementById('updateDrugIdStockNumber').value;
    const stockNumber = document.getElementById('updateStockNumber').value;
    try {
        const response = await fetch('http://localhost:3000/updateStockNumber', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ drugId, stockNumber })
        })
        const data = await response.json();
        if (response.status === 200) {
            drugStockNumberUpdateResult.textContent = data.message;
        } else if (response.status === 404) {
            drugStockNumberUpdateResult.textContent = data.message;
        } else if (response.status === 500) {
            drugStockNumberUpdateResult.textContent = data.message;
        }
    } catch (error) {
        console.error('Có lỗi xảy ra', error);
    };
}

async function addDrugInfo(drugName, unit, indication, expiredDate, stockNumber, price) {
    const drugAddResult = document.getElementById('drugAddResult');
    try {
        const response = await fetch('http://localhost:3000/addDrugInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ drugName, unit, indication, expiredDate, stockNumber, price})
        })
        const data = await response.json();
        if (response.status === 200) {
            drugAddResult.textContent = data.message;
        } else if (response.status === 500) {
            drugAddResult.textContent = data.message;
        }    
    } catch (error) {
        drugAddResult.textContent = data.message;
        console.error('Có lỗi xảy ra', error);
    }  
}

async function deleteDrugInfo() {
    const drugDeleteResult = document.getElementById('drugDeleteResult');
    const drugId = document.getElementById('deleteDrugId').value;
    try {
        const response = await fetch(`http://localhost:3000/deleteDrugInfo/${drugId}`, {
            method: 'DELETE'
        })
        const data = await response.json();
        if (response.status === 200) {
            drugDeleteResult.textContent = data.message;
        } else {
            drugDeleteResult.textContent = data.message;
        }
    } catch(error) {
        console.error('Có lỗi xảy ra', error);
    }
}

async function deleteExpiredDrugs() {
    const drugsExpiredDeleteResult = document.getElementById('drugsExpiredDeleteResult');
    try {
        const response = await fetch(`http://localhost:3000/deleteExpiredDrugs`, {
        method: 'DELETE',
        })
        const data = await response.json();
        if (response.status === 200) {
            drugsExpiredDeleteResult.textContent = data.message;
        } else {
            drugsExpiredDeleteResult.textContent = data.message;
        }
    } catch(error) {
        console.error('Có lỗi xảy ra', error);
    }
}

async function lockAccount(username) {
    const lockAccountResult = document.getElementById('lockAccountResult');
    try {
        const response = await fetch(`http://localhost:3000/lockAccount`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username })
        })
        const data = await response.json();
        if (response.status === 200) {
            lockAccountResult.textContent = data.message;
        } else {
            lockAccountResult.textContent = data.message;
        }
    } catch(error) {
        console.error('Có lỗi xảy ra', error);
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

module.exports = { getAllStaffsInfo, getStaffInfo, addStaffInfo }
module.exports = { getAllDentistsInfo, getDentistInfo, addDentistInfo};
module.exports = { getAllDrugsInfo, getDrugInfo, updateDrugInfo, updateStockNumber, addDrugInfo, deleteDrugInfo, deleteExpiredDrugs};
module.exports = { lockAccount, openTab};