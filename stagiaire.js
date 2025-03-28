document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('stagiaireForm');
    const cyberButton = document.querySelector('.cyber-button');

    // Animation particules bouton
    cyberButton.addEventListener('mouseenter', (e) => {
        const buttonRect = cyberButton.getBoundingClientRect();
        const particles = [];
        
        // Crée 8 particules
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('span');
            particle.className = 'button-particle';
            
            // Position aléatoire
            const angle = Math.random() * Math.PI * 2;
            const distance = 15 + Math.random() * 30;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            
            particle.style.setProperty('--tx', `${tx}px`);
            particle.style.setProperty('--ty', `${ty}px`);
            particle.style.left = `${50 + Math.cos(angle) * 10}%`;
            particle.style.top = `${50 + Math.sin(angle) * 10}%`;
            particle.style.background = i % 2 === 0 ? 'var(--primary)' : 'var(--accent)';
            particle.style.width = `${6 + Math.random() * 4}px`;
            particle.style.height = particle.style.width;
            
            cyberButton.appendChild(particle);
            particles.push(particle);
            
            // Supprime après animation
            setTimeout(() => {
                particle.remove();
            }, 600);
        }
    });

    // Soumission du formulaire
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            nom: form.nom.value,
            objectifs: form.objectifs.value,
            difficultes: form.difficultes.value,
            date: new Date().toISOString()
        };

        // Simulation envoi (remplacez par un vrai fetch)
        cyberButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Stockage local
        const existingData = JSON.parse(localStorage.getItem('stagiaireResponses') || '[]');
        existingData.push(formData);
        localStorage.setItem('stagiaireResponses', JSON.stringify(existingData));
        
        // Feedback visuel
        cyberButton.innerHTML = '<i class="fas fa-check"></i> Envoyé !';
        cyberButton.style.backgroundColor = 'var(--primary)';
        
        setTimeout(() => {
            form.reset();
            cyberButton.innerHTML = '<span class="button-text">Envoyer</span><span class="button-glare"></span>';
            cyberButton.style.backgroundColor = 'transparent';
        }, 2000);
    });

    // Effet de flottement aléatoire
    const card = document.querySelector('.stagiaire-card');
    let floatInterval;
    
    const startFloat = () => {
        floatInterval = setInterval(() => {
            const x = Math.sin(Date.now() / 2000) * 3;
            const y = Math.cos(Date.now() / 1500) * 2;
            card.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg)`;
        }, 50);
    };
    
    const stopFloat = () => {
        clearInterval(floatInterval);
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    };
    
    card.addEventListener('mouseenter', startFloat);
    card.addEventListener('mouseleave', stopFloat);
});