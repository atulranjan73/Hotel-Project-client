const hamburger = document.querySelector('.humberger');
        const navMenu = document.querySelector('nav ul');

        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Toggle between hamburger and close icon
            const icon = hamburger.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('bi-list');
                icon.classList.add('bi-x');
            } else {
                icon.classList.remove('bi-x');
                icon.classList.add('bi-list');
            }
        });

        // Close menu when clicking a menu item
        const menuItems = document.querySelectorAll('nav ul li');
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('bi-x');
                icon.classList.add('bi-list');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target) && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('bi-x');
                icon.classList.add('bi-list');
            }
        });