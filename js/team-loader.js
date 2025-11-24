$(document).ready(function () {
    const teamContainer = document.getElementById('team-container');

    if (!teamContainer) {
        console.error("Team container not found!");
        return;
    }

    if (typeof CONFIG !== 'undefined' && CONFIG.teamUrl && typeof fetchCSVData === 'function') {
        fetchCSVData(CONFIG.teamUrl).then(data => {
            if (data && data.length > 0) {
                renderTeam(data, teamContainer);
            } else {
                teamContainer.innerHTML = '<p class="text-center">No team members found.</p>';
            }
        }).catch(err => {
            console.error("Error loading team data:", err);
            teamContainer.innerHTML = '<p class="text-center">Error loading team data.</p>';
        });
    } else {
        console.error("Config or Data Loader not found.");
    }
});

function renderTeam(teamMembers, container) {
    container.innerHTML = ''; // Clear existing content

    teamMembers.forEach((member, index) => {
        // Create elements
        const colDiv = document.createElement('div');
        colDiv.className = 'col-md-4 col-lg-4 col-sm-6 col-10';

        const itemDiv = document.createElement('div');
        itemDiv.className = 'single-blog-item sm-mb30 xs-mb30 wow fadeInUp';
        // Staggered animation delay: 0.2s, 0.3s, 0.4s then repeat
        itemDiv.setAttribute('data-wow-delay', (0.2 + (index % 3) * 0.1) + 's');

        const thumbDiv = document.createElement('div');
        thumbDiv.className = 'blog-thumb';

        const imgLink = document.createElement('a');
        imgLink.href = '#';

        const img = document.createElement('img');
        // Handle relative paths if needed, or assume paths in CSV are correct relative to page or root
        // Since team.html is in team/ folder, and images might be in team/team_img/ or root images/
        // The mock CSV has "team_img/..." which works if relative to team.html? 
        // Wait, team.html is in `team/` folder. `team_img` is likely inside `team/` folder based on existing HTML `src="team_img\Jivnesh Sandhan.jpeg"`
        img.src = member.pic || '../images/logo.png';
        img.style.height = '35rem';
        img.style.width = '35rem';
        img.alt = member.name;

        imgLink.appendChild(img);
        thumbDiv.appendChild(imgLink);

        const detailsDiv = document.createElement('div');
        detailsDiv.className = 'blog-details padding30';

        const titleH3 = document.createElement('h3');
        titleH3.className = 'blog-title font20 mb30';

        const nameLink = document.createElement('a');
        nameLink.href = '#';
        // Construct the text: Name <br/> Role, Year
        // Note: CSV columns are name, pic, role, department, year, email, phone
        let roleText = member.role ? member.role : '';
        if (member.year) roleText += (roleText ? ', ' : '') + member.year;

        nameLink.innerHTML = `${member.name} <br/> ${roleText}`;

        titleH3.appendChild(nameLink);

        const metaP = document.createElement('p');
        metaP.className = 'blog-meta font14 mt20';

        if (member.email) {
            const emailLink = document.createElement('a');
            emailLink.href = `mailto:${member.email}`;
            emailLink.innerText = member.email;
            metaP.appendChild(emailLink);
        }

        if (member.phone) {
            if (member.email) metaP.appendChild(document.createElement('br'));
            const phoneLink = document.createElement('a');
            phoneLink.href = `tel:${member.phone}`;
            phoneLink.innerText = member.phone;
            metaP.appendChild(phoneLink);
        }

        detailsDiv.appendChild(titleH3);
        detailsDiv.appendChild(metaP);

        itemDiv.appendChild(thumbDiv);
        itemDiv.appendChild(detailsDiv);
        colDiv.appendChild(itemDiv);

        container.appendChild(colDiv);
    });
}
