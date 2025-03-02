
document.getElementById("updateAccountBtn").addEventListener("click", function() {
    
    if (confirm("Ești sigur că vrei să modifci contul?")) {
        const newUsername = document.getElementById("update_input").value;
        
        fetch("/update-account", {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ newUsername: newUsername })
            
        })
        .then(() => {
            alert("Contul a fost actualizat  cu succes");
            window.location.href = "/meniu.html";
        });
    }
});