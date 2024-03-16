document.addEventListener("DOMContentLoaded", function() {
    const setAvatarBtn = document.getElementById('setAvatarBtn');
    const setBannerBtn = document.getElementById('setBannerBtn');

    setAvatarBtn.addEventListener('click', function() {
        setMedia('avatarFileInput');
    });

    setBannerBtn.addEventListener('click', function() {
        setMedia('bannerFileInput');
    });

    // Load bot token from localStorage on page load
    const savedToken = localStorage.getItem('botToken');
    if (savedToken) {
        document.getElementById('botTokenInput').value = savedToken;
    }
});

function setMedia(fileInputId) {
    const botTokenInput = document.getElementById('botTokenInput').value;
    const fileInput = document.getElementById(fileInputId);
    const file = fileInput.files[0];

    if (!botTokenInput) {
        alert('Please enter the bot token.');
        return;
    }

    if (!file) {
        alert('Please choose a file.');
        return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        const base64Data = reader.result.split(',')[1]; // Extract base64 data
        const fileType = file.type.split('/')[1]; // Extract file type
        const endpoint = 'https://discord.com/api/v10/users/@me';

        const data = {};
        if (fileInputId === 'avatarFileInput') {
            data.avatar = `data:image/${fileType};base64,${base64Data}`;
        } else if (fileInputId === 'bannerFileInput') {
            data.banner = `data:image/${fileType};base64,${base64Data}`;
        }

        const requestData = {
            method: 'PATCH',
            headers: {
                'Authorization': 'Bot ' + botTokenInput,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };

        fetch(endpoint, requestData)
            .then(response => {
                if (response.ok) {
                    alert('Media set successfully!');
                } else {
                    alert('Error setting media');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred, please try again later');
            });
    };
              }
      
