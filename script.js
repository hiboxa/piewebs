document.addEventListener('DOMContentLoaded', function() {
    // 1. ESPACE STAGIAIRE
    const formStagiaire = document.getElementById('form-stagiaire');
    if (formStagiaire) {
        formStagiaire.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupère les réponses
            const reponse = {
                nom: document.getElementById('nom').value,
                q1: document.getElementById('q1').value,
                q2: document.getElementById('q2').value,
                date: new Date().toLocaleString()
            };

            // Vérifie que tout est rempli
            if (!reponse.nom || !reponse.q1 || !reponse.q2) {
                alert("Tous les champs sont obligatoires !");
                return;
            }

            // Sauvegarde
            let toutesReponses = JSON.parse(localStorage.getItem('reponses')) || [];
            toutesReponses.push(reponse);
            localStorage.setItem('reponses', JSON.stringify(toutesReponses));
            
            alert("Merci pour vos réponses !");
            formStagiaire.reset();
        });
    }

    // 2. ESPACE FORMATEUR
    const affichage = document.getElementById('affichage-reponses');
    if (affichage) {
        const reponses = JSON.parse(localStorage.getItem('reponses')) || [];
        
        if (reponses.length === 0) {
            affichage.innerHTML = "<p>Aucune réponse pour le moment.</p>";
        } else {
            let html = "<h3>Réponses des stagiaires :</h3>";
            reponses.forEach(rep => {
                html += `
                <div class="reponse">
                    <p><strong>${rep.nom}</strong> (${rep.date})</p>
                    <p>Objectif : ${rep.q1}</p>
                    <p>Difficultés : ${rep.q2}</p>
                    <hr>
                </div>
                `;
            });
            affichage.innerHTML = html;
        }
    }
});