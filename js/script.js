/* ==========================================
   READY-N - SCRIPT JAVASCRIPT PRINCIPAL
   Gestion du menu, formulaire et validation
   ========================================== */

/* ==========================================
   MENU MOBILE - HAMBURGER
   ========================================== */

/**
 * Initialise le menu hamburger pour mobile
 * Gère l'ouverture et la fermeture du menu de navigation
 */
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            // Toggle la classe 'active' pour afficher/masquer le menu
            mainNav.classList.toggle('active');
            
            // Animation du bouton hamburger
            this.classList.toggle('active');
        });
        
        // Fermer le menu quand on clique sur un lien
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                mainNav.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }
}

/* ==========================================
   GESTION DES CHAMPS CONDITIONNELS
   ========================================== */

/**
 * Affiche ou masque les champs conditionnels selon le sujet sélectionné
 * Règles :
 * - Demande d'information → Domaine d'intérêt
 * - Support technique → Numéro de ticket + Urgence
 * - Réclamation → Date de l'incident
 * - Autre → Aucun champ supplémentaire
 */
function handleConditionalFields() {
    const sujetSelect = document.getElementById('sujet');
    
    if (!sujetSelect) return; // Si pas de formulaire sur la page, on sort
    
    // Récupération des groupes de champs conditionnels
    const domaineGroup = document.getElementById('domaineGroup');
    const ticketGroup = document.getElementById('ticketGroup');
    const urgenceGroup = document.getElementById('urgenceGroup');
    const dateIncidentGroup = document.getElementById('dateIncidentGroup');
    
    // Fonction pour masquer tous les champs conditionnels
    function hideAllConditionalFields() {
        if (domaineGroup) domaineGroup.style.display = 'none';
        if (ticketGroup) ticketGroup.style.display = 'none';
        if (urgenceGroup) urgenceGroup.style.display = 'none';
        if (dateIncidentGroup) dateIncidentGroup.style.display = 'none';
        
        // Désactiver le required sur les champs masqués
        if (domaineGroup) document.getElementById('domaine').removeAttribute('required');
        if (ticketGroup) document.getElementById('ticket').removeAttribute('required');
        if (urgenceGroup) document.getElementById('urgence').removeAttribute('required');
        if (dateIncidentGroup) document.getElementById('dateIncident').removeAttribute('required');
    }
    
    // Fonction pour afficher les champs selon le sujet
    function showConditionalFields(sujetValue) {
        hideAllConditionalFields(); // Masquer tous les champs d'abord
        
        switch(sujetValue) {
            case 'information':
                // Afficher Domaine d'intérêt
                if (domaineGroup) {
                    domaineGroup.style.display = 'block';
                    document.getElementById('domaine').setAttribute('required', 'required');
                }
                break;
                
            case 'support':
                // Afficher Numéro de ticket et Urgence
                if (ticketGroup) {
                    ticketGroup.style.display = 'block';
                    document.getElementById('ticket').setAttribute('required', 'required');
                }
                if (urgenceGroup) {
                    urgenceGroup.style.display = 'block';
                    document.getElementById('urgence').setAttribute('required', 'required');
                }
                break;
                
            case 'reclamation':
                // Afficher Date de l'incident
                if (dateIncidentGroup) {
                    dateIncidentGroup.style.display = 'block';
                    document.getElementById('dateIncident').setAttribute('required', 'required');
                }
                break;
                
            case 'autre':
                // Aucun champ supplémentaire
                break;
        }
    }
    
    // Écouter les changements sur le select Sujet
    sujetSelect.addEventListener('change', function() {
        showConditionalFields(this.value);
    });
}

/* ==========================================
   VALIDATION EN TEMPS RÉEL
   ========================================== */

/**
 * Valide le champ Nom
 * Règle : minimum 3 caractères
 */
function validateNom(nomInput) {
    const errorSpan = document.getElementById('nomError');
    const formGroup = nomInput.closest('.form-group');
    const value = nomInput.value.trim();
    
    if (value.length === 0) {
        showError(formGroup, errorSpan, 'Le nom est obligatoire');
        return false;
    } else if (value.length < 3) {
        showError(formGroup, errorSpan, 'Le nom doit contenir au moins 3 caractères');
        return false;
    } else {
        clearError(formGroup, errorSpan);
        return true;
    }
}

/**
 * Valide le champ Email
 * Règle : doit contenir @ et un point
 */
function validateEmail(emailInput) {
    const errorSpan = document.getElementById('emailError');
    const formGroup = emailInput.closest('.form-group');
    const value = emailInput.value.trim();
    
    if (value.length === 0) {
        showError(formGroup, errorSpan, 'L\'email est obligatoire');
        return false;
    }
    
    // Vérification basique : contient @ et .
    const hasAt = value.includes('@');
    const hasDot = value.includes('.');
    const atIndex = value.indexOf('@');
    const dotAfterAt = atIndex > -1 && value.indexOf('.', atIndex) > atIndex;
    
    if (!hasAt || !hasDot) {
        showError(formGroup, errorSpan, 'L\'email doit contenir @ et un point');
        return false;
    } else if (!dotAfterAt) {
        showError(formGroup, errorSpan, 'Format d\'email invalide');
        return false;
    } else {
        clearError(formGroup, errorSpan);
        return true;
    }
}

/**
 * Valide le champ Téléphone
 * Règle : uniquement des chiffres, minimum 9 chiffres
 */
function validateTelephone(telephoneInput) {
    const errorSpan = document.getElementById('telephoneError');
    const formGroup = telephoneInput.closest('.form-group');
    const value = telephoneInput.value.trim();
    
    if (value.length === 0) {
        showError(formGroup, errorSpan, 'Le téléphone est obligatoire');
        return false;
    }
    
    // Vérifier que ce sont uniquement des chiffres
    const onlyDigits = /^[0-9]+$/.test(value);
    
    if (!onlyDigits) {
        showError(formGroup, errorSpan, 'Le téléphone ne doit contenir que des chiffres');
        return false;
    } else if (value.length < 9) {
        showError(formGroup, errorSpan, 'Le téléphone doit contenir au moins 10 chiffres');
        return false;
    } else {
        clearError(formGroup, errorSpan);
        return true;
    }
}

/**
 * Valide un champ select
 */
function validateSelect(selectInput, errorId, errorMessage) {
    const errorSpan = document.getElementById(errorId);
    const formGroup = selectInput.closest('.form-group');
    
    if (selectInput.value === '') {
        showError(formGroup, errorSpan, errorMessage);
        return false;
    } else {
        clearError(formGroup, errorSpan);
        return true;
    }
}

/**
 * Valide un champ textarea
 */
function validateTextarea(textareaInput, errorId, errorMessage) {
    const errorSpan = document.getElementById(errorId);
    const formGroup = textareaInput.closest('.form-group');
    const value = textareaInput.value.trim();
    
    if (value.length === 0) {
        showError(formGroup, errorSpan, errorMessage);
        return false;
    } else {
        clearError(formGroup, errorSpan);
        return true;
    }
}

/**
 * Valide les radio buttons
 */
function validateRadio(radioName, errorId, errorMessage) {
    const radios = document.getElementsByName(radioName);
    const errorSpan = document.getElementById(errorId);
    const formGroup = errorSpan.closest('.form-group');
    
    let isChecked = false;
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            isChecked = true;
            break;
        }
    }
    
    if (!isChecked) {
        showError(formGroup, errorSpan, errorMessage);
        return false;
    } else {
        clearError(formGroup, errorSpan);
        return true;
    }
}

/**
 * Affiche un message d'erreur
 */
function showError(formGroup, errorSpan, message) {
    formGroup.classList.add('has-error');
    errorSpan.textContent = message;
}

/**
 * Efface un message d'erreur
 */
function clearError(formGroup, errorSpan) {
    formGroup.classList.remove('has-error');
    errorSpan.textContent = '';
}

/**
 * Initialise la validation en temps réel
 */
function initRealtimeValidation() {
    const nomInput = document.getElementById('nom');
    const emailInput = document.getElementById('email');
    const telephoneInput = document.getElementById('telephone');
    
    if (!nomInput || !emailInput || !telephoneInput) return;
    
    // Validation du nom lors de la saisie (avec un petit délai)
    nomInput.addEventListener('input', function() {
        if (this.value.length > 0) {
            validateNom(this);
        }
    });
    
    // Validation du nom quand on quitte le champ
    nomInput.addEventListener('blur', function() {
        validateNom(this);
    });
    
    // Validation de l'email lors de la saisie
    emailInput.addEventListener('input', function() {
        if (this.value.length > 0) {
            validateEmail(this);
        }
    });
    
    // Validation de l'email quand on quitte le champ
    emailInput.addEventListener('blur', function() {
        validateEmail(this);
    });
    
    // Validation du téléphone lors de la saisie
    telephoneInput.addEventListener('input', function() {
        if (this.value.length > 0) {
            validateTelephone(this);
        }
    });
    
    // Validation du téléphone quand on quitte le champ
    telephoneInput.addEventListener('blur', function() {
        validateTelephone(this);
    });
}

/* ==========================================
   VALIDATION À LA SOUMISSION
   ========================================== */

/**
 * Valide tous les champs du formulaire
 * Retourne true si tout est valide, false sinon
 */
function validateAllFields() {
    let isValid = true;
    
    // Validation des champs obligatoires de base
    const nomInput = document.getElementById('nom');
    const emailInput = document.getElementById('email');
    const telephoneInput = document.getElementById('telephone');
    const sujetSelect = document.getElementById('sujet');
    const messageTextarea = document.getElementById('message');
    
    if (!validateNom(nomInput)) isValid = false;
    if (!validateEmail(emailInput)) isValid = false;
    if (!validateTelephone(telephoneInput)) isValid = false;
    if (!validateSelect(sujetSelect, 'sujetError', 'Veuillez sélectionner un sujet')) isValid = false;
    if (!validateTextarea(messageTextarea, 'messageError', 'Le message est obligatoire')) isValid = false;
    if (!validateRadio('typeDemande', 'typeDemandeError', 'Veuillez sélectionner un type de demande')) isValid = false;
    
    // Validation des champs conditionnels selon le sujet
    const sujetValue = sujetSelect.value;
    
    if (sujetValue === 'information') {
        const domaineInput = document.getElementById('domaine');
        if (domaineInput.value.trim() === '') {
            showError(domaineInput.closest('.form-group'), document.getElementById('domaineError'), 'Le domaine d\'intérêt est obligatoire');
            isValid = false;
        }
    }
    
    if (sujetValue === 'support') {
        const ticketInput = document.getElementById('ticket');
        const urgenceSelect = document.getElementById('urgence');
        
        if (ticketInput.value.trim() === '') {
            showError(ticketInput.closest('.form-group'), document.getElementById('ticketError'), 'Le numéro de ticket est obligatoire');
            isValid = false;
        }
        if (urgenceSelect.value === '') {
            showError(urgenceSelect.closest('.form-group'), document.getElementById('urgenceError'), 'Veuillez sélectionner un niveau d\'urgence');
            isValid = false;
        }
    }
    
    if (sujetValue === 'reclamation') {
        const dateIncidentInput = document.getElementById('dateIncident');
        if (dateIncidentInput.value === '') {
            showError(dateIncidentInput.closest('.form-group'), document.getElementById('dateIncidentError'), 'La date de l\'incident est obligatoire');
            isValid = false;
        }
    }
    
    return isValid;
}

/**
 * Génère un récapitulatif des données du formulaire
 */
function generateRecapitulatif() {
    const nom = document.getElementById('nom').value;
    const email = document.getElementById('email').value;
    const telephone = document.getElementById('telephone').value;
    const sujet = document.getElementById('sujet');
    const sujetText = sujet.options[sujet.selectedIndex].text;
    const message = document.getElementById('message').value;
    
    // Type de demande
    const typeDemandeRadios = document.getElementsByName('typeDemande');
    let typeDemande = '';
    for (let i = 0; i < typeDemandeRadios.length; i++) {
        if (typeDemandeRadios[i].checked) {
            const label = document.querySelector('label[for="' + typeDemandeRadios[i].id + '"]');
            typeDemande = label.textContent;
            break;
        }
    }
    
    // Construction du récapitulatif HTML
    let recapHTML = '<h4>Récapitulatif de votre demande :</h4>';
    recapHTML += '<p><strong>Nom :</strong> ' + nom + '</p>';
    recapHTML += '<p><strong>Email :</strong> ' + email + '</p>';
    recapHTML += '<p><strong>Téléphone :</strong> ' + telephone + '</p>';
    recapHTML += '<p><strong>Sujet :</strong> ' + sujetText + '</p>';
    recapHTML += '<p><strong>Type de demande :</strong> ' + typeDemande + '</p>';
    
    // Ajouter les champs conditionnels si présents
    const sujetValue = document.getElementById('sujet').value;
    
    if (sujetValue === 'information') {
        const domaine = document.getElementById('domaine').value;
        if (domaine) {
            recapHTML += '<p><strong>Domaine d\'intérêt :</strong> ' + domaine + '</p>';
        }
    }
    
    if (sujetValue === 'support') {
        const ticket = document.getElementById('ticket').value;
        const urgence = document.getElementById('urgence');
        if (ticket) {
            recapHTML += '<p><strong>Numéro de ticket :</strong> ' + ticket + '</p>';
        }
        if (urgence.value) {
            const urgenceText = urgence.options[urgence.selectedIndex].text;
            recapHTML += '<p><strong>Urgence :</strong> ' + urgenceText + '</p>';
        }
    }
    
    if (sujetValue === 'reclamation') {
        const dateIncident = document.getElementById('dateIncident').value;
        if (dateIncident) {
            recapHTML += '<p><strong>Date de l\'incident :</strong> ' + dateIncident + '</p>';
        }
    }
    
    recapHTML += '<p><strong>Message :</strong> ' + message.substring(0, 100);
    if (message.length > 100) {
        recapHTML += '...';
    }
    recapHTML += '</p>';
    
    return recapHTML;
}

/**
 * Initialise la gestion de la soumission du formulaire
 */
function initFormSubmit() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return; // Si pas de formulaire, on sort
    
    contactForm.addEventListener('submit', function(e) {
        // Empêcher l'envoi par défaut du formulaire
        e.preventDefault();
        
        // Valider tous les champs
        if (!validateAllFields()) {
            // Si la validation échoue, afficher un message d'alerte
            alert('Veuillez corriger les erreurs dans le formulaire avant de soumettre.');
            
            // Faire défiler vers le premier champ en erreur
            const firstError = document.querySelector('.has-error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            
            return false;
        }
        
        // Si tout est valide, afficher le message de succès
        const successMessage = document.getElementById('successMessage');
        const recapitulatif = document.getElementById('recapitulatif');
        
        // Générer le récapitulatif
        recapitulatif.innerHTML = generateRecapitulatif();
        
        // Masquer le formulaire et afficher le message de succès
        contactForm.style.display = 'none';
        successMessage.style.display = 'block';
        
        // Faire défiler vers le message de succès
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Log dans la console pour le débogage
        console.log('Formulaire soumis avec succès !');
        console.log('Données du formulaire :', {
            nom: document.getElementById('nom').value,
            email: document.getElementById('email').value,
            telephone: document.getElementById('telephone').value,
            sujet: document.getElementById('sujet').value,
            message: document.getElementById('message').value
        });
    });
}

/* ==========================================
   INITIALISATION AU CHARGEMENT DE LA PAGE
   ========================================== */

/**
 * Fonction principale appelée au chargement du DOM
 */
function init() {
    // Initialiser le menu mobile
    initMobileMenu();
    
    // Initialiser la gestion des champs conditionnels
    handleConditionalFields();
    
    // Initialiser la validation en temps réel
    initRealtimeValidation();
    
    // Initialiser la soumission du formulaire
    initFormSubmit();
}

// Attendre que le DOM soit complètement chargé
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
