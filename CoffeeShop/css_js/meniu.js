
window.onload = () => {
    document.getElementById("deleteAccountBtn").addEventListener("click", function() {
        if (confirm("Ești sigur că vrei să ștergi contul?")) 
        {
            fetch("/check-authentication", {
                method: "GET"
            })

            .then(response => {
                if (response.ok) 
                {
                    fetch("/delete-account", {
                        method: "DELETE"
                    })
                    .then(() => {
                        alert("Contul a fost sters!");
                        window.location.href = "/meniu.html"; 
                    });
                }
                else 
                {
                    alert("Nu esti autentificat!");
                }
            })
            .catch(error => {
                console.error('Eroare:', error);
            });
        }
    });
};
