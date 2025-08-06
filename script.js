// Function to move to the next stage
function nextStage(stageNumber) {
    const currentStage = document.querySelector('.stage.active');
    const nextStage = document.getElementById(`stage${stageNumber}`);

    if (currentStage && nextStage) {
        currentStage.classList.remove('active');
        nextStage.classList.add('active');
    }
}

// Function to move to the previous stage
function prevStage(stageNumber) {
    const currentStage = document.querySelector('.stage.active');
    const prevStage = document.getElementById(`stage${stageNumber}`);

    if (currentStage && prevStage) {
        currentStage.classList.remove('active');
        prevStage.classList.add('active');
    }
}

// Function to submit the design
function submitDesign() {
    const garment = document.querySelector('input[name="garment"]:checked');
    const cut = document.querySelector('input[name="cut"]:checked');
    const fabric = document.querySelector('input[name="fabric"]:checked');
    const primaryColor = document.getElementById('primary-color').value;
    const secondaryColor = document.getElementById('secondary-color').value;
    const accentColor = document.getElementById('accent-color').value;
    const pattern = document.querySelector('input[name="pattern"]:checked');

    const measurements = {
        shoulderToShoulder: document.getElementById('shoulder-to-shoulder').value,
        bust: document.getElementById('bust').value,
        waist: document.getElementById('waist').value,
        hips: document.getElementById('hips').value,
        shoulderToHem: document.getElementById('shoulder-to-hem').value,
        sleeveLength: document.getElementById('sleeve-length').value
    };

    // Validate required fields
    if (!garment || !cut || !fabric) {
        alert('Please complete all required stages before submitting.');
        return;
    }

    // Create design summary
    const designSummary = {
        garment: garment.value,
        cut: cut.value,
        fabric: fabric.value,
        colors: {
            primary: primaryColor,
            secondary: secondaryColor,
            accent: accentColor
        },
        pattern: pattern ? pattern.value : 'No pattern selected',
        measurements: measurements
    };

    // Show summary and confirmation
    alert('Design Summary:\n' + JSON.stringify(designSummary, null, 2));

    // Here you would typically send the designSummary to a server or handle it as needed
    console.log('Design submitted:', designSummary);
}