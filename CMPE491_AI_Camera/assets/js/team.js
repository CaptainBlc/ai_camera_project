/* Dynamically load team.json and render team cards */
(async function() {
  const grid = document.getElementById('teamGrid');
  if (!grid) return;
  try {
    const res = await fetch('team.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('team.json yÃ¼klenemedi');
    const team = await res.json();
    render(team);
  } catch (err) {
    grid.innerHTML = '<p style="color: var(--muted);">Ekip bilgileri yÃ¼klenemedi.</p>';
  }

  function initials(name) {
    return name.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase();
  }

  function render(team) {
    const frag = document.createDocumentFragment();
    team.forEach(member => {
      const card = document.createElement('div');
      card.className = 'member-card';
      card.setAttribute('data-reveal', 'fade-up');
      const avatar = document.createElement('div');
      avatar.className = 'avatar';
      if (member.photo) {
        const img = document.createElement('img');
        img.src = member.photo; img.alt = member.name; img.width = 56; img.height = 56; img.style.borderRadius = '50%';
        avatar.textContent = '';
        avatar.appendChild(img);
      } else {
        avatar.textContent = initials(member.name || '?');
      }

      const info = document.createElement('div');
      const name = document.createElement('h4'); name.className = 'member-name'; name.textContent = member.name;
      const role = document.createElement('div'); role.className = 'member-role'; role.textContent = member.role;
      const bio = document.createElement('p'); bio.className = 'member-bio'; bio.textContent = member.bio || '';
      const links = document.createElement('div'); links.className = 'member-links';
      if (member.linkedin) links.appendChild(link('ri-linkedin-box-line', member.linkedin));
      if (member.github) links.appendChild(link('ri-github-line', member.github));
      if (member.email) links.appendChild(link('ri-mail-line', 'mailto:' + member.email));

      info.appendChild(name);
      info.appendChild(role);
      info.appendChild(bio);
      info.appendChild(links);

      card.appendChild(avatar);
      card.appendChild(info);
      frag.appendChild(card);
    });
    grid.appendChild(frag);
  }

  function link(icon, href) {
    const a = document.createElement('a'); a.href = href; a.target = '_blank'; a.rel = 'noopener'; a.ariaLabel = 'link';
    const i = document.createElement('i'); i.className = icon;
    a.appendChild(i);
    return a;
  }
})();