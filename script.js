document.addEventListener('DOMContentLoaded', function() {
    // --- PARTIE EXISTANTE (votre code actuel) ---
    // 1. Gestion des tags
    const tagInputs = ['tag1', 'tag2', 'tag3'];
    
    tagInputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', function() {
                const tableInput = document.querySelector(`input[name="${id}_table"]`);
                if (tableInput) {
                    tableInput.value = this.value;
                }
            });
        }
    });
    
    // 2. Gestion des formulaires avec AJAX (existant)
    document.querySelectorAll('form').forEach(form => {
        // On exclut le formulaire quiz qui a son propre handler
        if (form.id !== 'form-stagiaire') {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const formData = new FormData(this);
                
                fetch(this.action, {
                    method: this.method,
                    body: formData
                })
                .then(response => {
                    if (response.redirected) {
                        window.location.href = response.url;
                    } else {
                        return response.json();
                    }
                })
                .then(data => {
                    if (data && data.success) {
                        alert('Données enregistrées avec succès!');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Une erreur est survenue');
                });
            });
        }
    });

    // --- NOUVELLE PARTIE AJOUTÉE ---
    // 1. Gestion espace stagiaire
    if (document.getElementById('form-stagiaire')) {
        document.getElementById('form-stagiaire').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const reponse = {
                nom: document.getElementById('nom').value,
                q1: document.getElementById('q1').value,
                q2: document.getElementById('q2').value,
                date: new Date().toLocaleString()
            };

            // Validation
            if (!reponse.nom || !reponse.q1 || !reponse.q2) {
                alert('Tous les champs sont obligatoires !');
                return;
            }

            // Sauvegarde dans localStorage
            let toutesReponses = JSON.parse(localStorage.getItem('reponsesStagiaires')) || [];
            toutesReponses.push(reponse);
            localStorage.setItem('reponsesStagiaires', JSON.stringify(toutesReponses));
            
            alert('Merci pour vos réponses !');
            this.reset();
        });
    }

    // 2. Gestion espace formateur
    if (document.getElementById('affichage-reponses')) {
        const reponses = JSON.parse(localStorage.getItem('reponsesStagiaires')) || [];
        const container = document.getElementById('affichage-reponses');
        
        if (reponses.length === 0) {
            container.innerHTML = '<p>Aucune réponse pour le moment.</p>';
        } else {
            let html = '<h2>Récentes réponses :</h2>';
            reponses.forEach((rep, index) => {
                html += `
                <div class="reponse">
                    <h3>Réponse #${index + 1} - ${rep.nom}</h3>
                    <p><strong>Objectif :</strong> ${rep.q1}</p>
                    <p><strong>Difficultés :</strong> ${rep.q2}</p>
                    <small>${rep.date}</small>
                    <hr>
                </div>
                `;
            });
            container.innerHTML = html;
        }
    }
});