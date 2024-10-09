// Function to handle form submission (create new user)
let current_userId = "";
document.querySelector("#userForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const newUser = {
        firstName: document.querySelector("#firstName").value,
        lastName: document.querySelector("#lastName").value,
        phoneNumber: document.querySelector("#phoneNumber").value,
        email: document.querySelector("#email").value,
        address: document.querySelector("#address").value,
    };

    axios.post('http://localhost:8080/api/users', newUser)
        .then(() => {
            // Clear the form
            document.querySelector("#userForm").reset();
            // Reload users
            fetchUsers();
        })
        .catch(error => {
            console.error("Error creating user:", error);
        });
});








// Function to fetch all users
function fetchUsers() {
    axios.get('http://localhost:8080/api/users')
        .then(response => {
            const users = response.data;
            const tableBody = document.querySelector("#userTable tbody");
            tableBody.innerHTML = ''; // Clear the table

            users.forEach(user => {
                const row = `
                    <tr>
                        <td>${user.firstName}</td>
                        <td>${user.lastName}</td>
                        <td>${user.phoneNumber}</td>
                        <td>${user.email}</td>
                        <td>${user.address}</td>
                        <td class="actions">
                            <button onclick="editUser('${user.id}')">Edit</button>
                            <button onclick="deleteUser('${user.id}')">Delete</button>
                        </td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        })
        .catch(error => {
            console.error("Error fetching users:", error);
        });
}


// Function to delete a user
function deleteUser(userId) {
    axios.delete(`http://localhost:8080/api/users/${userId}`)
        .then(() => {
            fetchUsers();
        })
        .catch(error => {
            console.error("Error deleting user:", error);
        });
}


// Function to populate the form with the selected user's data (for editing)
function editUser(userId) {
    current_userId=userId;
    axios.get(`http://localhost:8080/api/users/${userId}`)
        .then(response => {
            const user = response.data;
            document.querySelector("#firstName").value = user.firstName;
            document.querySelector("#lastName").value = user.lastName;
            document.querySelector("#phoneNumber").value = user.phoneNumber;
            document.querySelector("#email").value = user.email;
            document.querySelector("#address").value = user.address;

            document.querySelector("#updateUserBtn").onclick=function(event) {
                event.preventDefault();
                updateUser(userId);
                };
        })
        .catch(error => {
            console.error("Error fetching user:", error);
        });
}
// Event listener for update button to update user
    document.getElementById('updateUserBtn').addEventListener('click', function() {
        updateUser();
    });
    function updateUser() {
            const userData = getUserFormData();

            const oldUser = {
                    id: current_userId,
                    firstName: userData.firstName,
                    lastName:  userData.lastName,
                    phoneNumber: userData.phoneNumber,
                    email: userData.email,
                    address: userData.address,
                };

                axios.post('http://localhost:8080/api/users', oldUser)
                    .then(() => {
                        // Clear the form
                        document.querySelector("#userForm").reset();
                        // Reload users
                        fetchUsers();
                    })
                    .catch(error => {
                        console.error("Error creating user:", error);
                    });



        }
    function getUserFormData() {
            return {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                phoneNumber: document.getElementById('phoneNumber').value,
                email: document.getElementById('email').value,
                address: document.getElementById('address').value
            };
        }

// Initial load of users
fetchUsers();




