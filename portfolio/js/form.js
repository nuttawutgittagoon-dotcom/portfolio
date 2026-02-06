// ===================================
// Form JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    initContactForm();
});

function initContactForm() {
    const form = document.getElementById('contactForm');

    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
}

async function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const submitText = document.getElementById('submitText');
    const submitSpinner = document.getElementById('submitSpinner');
    const formMessage = document.getElementById('formMessage');

    // Get form data
    const formData = new FormData(form);

    // Validate form
    if (!validateForm(formData)) {
        showMessage('กรุณากรอกข้อมูลให้ครบถ้วน', 'error');
        return;
    }

    // Show loading state
    submitBtn.disabled = true;
    submitText.style.display = 'none';
    submitSpinner.style.display = 'inline-block';

    try {
        // Send form data to PHP backend
        const response = await fetch('php/contact.php', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (result.success) {
            showMessage('ส่งข้อความสำเร็จ! ขอบคุณที่ติดต่อ', 'success');
            form.reset();
        } else {
            showMessage(result.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง', 'error');
        }
    } catch (error) {
        console.error('Form submission error:', error);
        showMessage('เกิดข้อผิดพลาดในการส่งข้อความ', 'error');
    } finally {
        // Reset button state
        submitBtn.disabled = false;
        submitText.style.display = 'inline';
        submitSpinner.style.display = 'none';
    }
}

function validateForm(formData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    // Check if all fields are filled
    if (!name || !email || !subject || !message) {
        return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage('รูปแบบอีเมลไม่ถูกต้อง', 'error');
        return false;
    }

    return true;
}

function showMessage(message, type) {
    const formMessage = document.getElementById('formMessage');

    if (formMessage) {
        formMessage.textContent = message;
        formMessage.style.display = 'block';
        formMessage.style.padding = 'var(--spacing-3)';
        formMessage.style.borderRadius = 'var(--radius-md)';

        if (type === 'success') {
            formMessage.style.backgroundColor = 'rgba(0, 112, 243, 0.1)';
            formMessage.style.color = 'var(--color-accent)';
            formMessage.style.border = '1px solid var(--color-accent)';
        } else {
            formMessage.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
            formMessage.style.color = 'var(--color-error)';
            formMessage.style.border = '1px solid var(--color-error)';
        }

        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}
