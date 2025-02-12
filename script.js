let testTubeContent = [];
let watchGlassContent = [];
    let selectedSalt = "";
//greenblue 100 , blue 160, pink 250

const circle = document.querySelector('.circle');
const stick = document.querySelector('.stick');
const paper = document.querySelector('.paper');
const testtube = document.querySelector('.testtube');

let risDragging = false;
let rdipped = false;
let pisDragging = false;
let pdipped = false;
let tisDragging = false; // For testtube dragging
let heating = false; // For testtube dipped
let hue = 360;
let brightness = 100;
let contrast = 100;
let ashcolor = "brown-ash.png"; // Correct way to represent an array of numbers
const watchglass = document.querySelector('.watchglass');
let wisDragging = false;

watchglass.addEventListener('touchstart', (e) => {
    wisDragging = true;
    watchglass.dataset.offsetX = e.touches[0].clientX - watchglass.offsetLeft;
    watchglass.dataset.offsetY = e.touches[0].clientY - watchglass.offsetTop;
    e.preventDefault();
});

document.addEventListener('touchmove', (e) => {
    if (wisDragging) {
        e.preventDefault();
        const offsetX = watchglass.dataset.offsetX;
        const offsetY = watchglass.dataset.offsetY;

        watchglass.style.position = "absolute";
        watchglass.style.left = `${e.touches[0].clientX - offsetX}px`;
        watchglass.style.top = `${e.touches[0].clientY - offsetY}px`;
    }
});

document.addEventListener('touchend', () => {
    wisDragging = false;
});

// Drop chemical into watch glass


// Allow dropping
watchglass.addEventListener("dragover", (event) => event.preventDefault());
watchglass.addEventListener("drop", dropChemicalToWatchGlass);


function changeHue(hue, brightness, contrast) {
  circle.style.filter = `hue-rotate(${hue}deg) brightness(${brightness}%) contrast(${contrast}%)`;
}
function changeAsh(imageUrl) {
  const paper = document.querySelector('.paper');
  paper.style.backgroundImage = `url(${imageUrl})`;
}

stick.addEventListener('touchstart', (e) => {
  risDragging = true;

  // Store initial touch and stick positions
  stick.dataset.offsetX = e.touches[0].clientX - stick.offsetLeft;
  stick.dataset.offsetY = e.touches[0].clientY - stick.offsetTop;

  e.preventDefault(); // Prevent text or elements from being highlighted
});

paper.addEventListener('touchstart', (e) => {
  pisDragging = true;

  // Store initial touch and paper positions
  paper.dataset.offsetX = e.touches[0].clientX - paper.offsetLeft;
  paper.dataset.offsetY = e.touches[0].clientY - paper.offsetTop;

  e.preventDefault(); // Prevent text or elements from being highlighted
});

testtube.addEventListener('touchstart', (e) => {
  tisDragging = true;

  // Store initial touch and testtube positions
  testtube.dataset.offsetX = e.touches[0].clientX - testtube.offsetLeft;
  testtube.dataset.offsetY = e.touches[0].clientY - testtube.offsetTop;

  e.preventDefault(); // Prevent text or elements from being highlighted
});

document.addEventListener('touchmove', (e) => {
  if (risDragging) {
    e.preventDefault();

    const offsetX = stick.dataset.offsetX;
    const offsetY = stick.dataset.offsetY;

    stick.style.position = "absolute";
    stick.style.left = `${e.touches[0].clientX - offsetX}px`;
    stick.style.top = `${e.touches[0].clientY - offsetY}px`;

    const stickRect = stick.getBoundingClientRect();
    const circleRect = circle.getBoundingClientRect();
    const testTubeRect = testtube.getBoundingClientRect();
    const watchglass = document.querySelector('.watchglass');
const watchGlassRect = watchglass.getBoundingClientRect();
    if (
      stickRect.top < circleRect.bottom &&
      stickRect.bottom > circleRect.top &&
      stickRect.left < circleRect.right &&
      stickRect.right > circleRect.left
    ) {
      if (rdipped) {
        changeHue(hue, brightness, contrast);
      }
    } else {
      changeHue(360, 100, 100);
    }

    if (
      stickRect.bottom > watchGlassRect.top &&
      stickRect.top < watchGlassRect.top &&
      watchGlassRect.left < stickRect.right &&
      watchGlassRect.right > stickRect.left
    ) {
      rdipped = true;
      setTimeout(() => {
        rdipped = false;
      }, 4000);
    }
  }

  if (pisDragging) {
    e.preventDefault();

    const offsetX = paper.dataset.offsetX;
    const offsetY = paper.dataset.offsetY;

    paper.style.position = "absolute";
    paper.style.left = `${e.touches[0].clientX - offsetX}px`;
    paper.style.top = `${e.touches[0].clientY - offsetY}px`;

    const paperRect = paper.getBoundingClientRect();
    const circleRect = circle.getBoundingClientRect();
    const testTubeRect = testtube.getBoundingClientRect();

    if (
      paperRect.top < circleRect.bottom &&
      paperRect.bottom > circleRect.top &&
      paperRect.left < circleRect.right &&
      paperRect.right > circleRect.left
    ) {
      if (pdipped) {
        changeAsh(ashcolor);
      }
    }

    if (
      paperRect.bottom > testTubeRect.top &&
      paperRect.top < testTubeRect.top &&
      testTubeRect.left < paperRect.right &&
      testTubeRect.right > paperRect.left
    ) {
      pdipped = true;
      setTimeout(() => {
        pdipped = false;
      }, 4000);
    }
  }

  // ... (previous code remains unchanged)

let heatingTimeout; // To store the timeout reference

if (tisDragging) {
    e.preventDefault();

    const offsetX = testtube.dataset.offsetX;
    const offsetY = testtube.dataset.offsetY;

    testtube.style.position = "absolute";
    testtube.style.left = `${e.touches[0].clientX - offsetX}px`;
    testtube.style.top = `${e.touches[0].clientY - offsetY}px`;

    const testTubeRect = testtube.getBoundingClientRect();
    const circleRect = circle.getBoundingClientRect();

    if (
      testTubeRect.top < circleRect.bottom &&
      testTubeRect.bottom > circleRect.top &&
      testTubeRect.left < circleRect.right &&
      testTubeRect.right > circleRect.left
    ) {
      // If the testtube is inside the circle
      if (!heating && !heatingTimeout) {
        
        // Set a timeout to trigger heating after 5 seconds
        heatingTimeout = setTimeout(() => {
          if(!heating){
          AddChemical("Heat");
          	heating = true;
          	console.log("Heating activated after 5 seconds!");
          }
          
          
          
        }, 5000); // 5000 milliseconds = 5 seconds
      }
    } else {
      // If the testtube is not inside the circle, clear the timeout
      if (heatingTimeout) {
        clearTimeout(heatingTimeout); // Prevent heating if the testtube leaves the circle
        heatingTimeout = null;
        console.log("Test tube left the circle, reset.");
      }
    }
}
// ... (rest of your code remains unchanged)
});

document.addEventListener('touchend', () => {
  risDragging = false;
  pisDragging = false;
  tisDragging = false;
});

    function startTest() {
        document.querySelector('.start-screen').classList.add('hidden');
        document.querySelector('.salt-selection').classList.remove('hidden');
        document.querySelector('.start-screen').style.display = 'none';
    }

    function selectSalt(salt) {
        selectedSalt = salt;
        document.getElementById('selected-salt').innerText = salt;
        document.querySelector('.salt-selection').classList.add('hidden');
        document.querySelector('.main-lab').classList.remove('hidden');
    }

    function startDrag(event) {
        event.dataTransfer.setData("text", event.target.dataset.chemical);
    }

    function allowDrop(event) {
        event.preventDefault();
    }

let currentHeight = 0;
const MAX_HEIGHT = 160;
function dropChemicalToWatchGlass(event) {
    event.preventDefault();
    const chemical = event.dataTransfer.getData("text");
    const watchglass = document.querySelector('.watchglass');
    const contentDiv = watchglass.querySelector('.content');

    if (!chemical) return;
watchGlassContent.unshift(chemical);
    const newChemicalDiv = document.createElement('div');
    newChemicalDiv.innerText = chemical;
    
    newChemicalDiv.style.height = '17px';
    
    contentDiv.appendChild(newChemicalDiv);
    contentDiv.scrollTop = contentDiv.scrollHeight;

    analyzeWatchGlassReaction(watchGlassContent);
}
function dropChemical(event) {
    event.preventDefault();
    const chemical = event.dataTransfer.getData("text");
    const testTube = event.target;
    const contentDiv = testTube.querySelector('.content');

    // Show the reaction layer (bubbles)
    testTubeContent.unshift(chemical);

    const newChemicalDiv = document.createElement('div');
    newChemicalDiv.innerText = chemical;

    if (chemical) {
        newChemicalDiv.style.backgroundColor = '#49ceff3e';
    }
    
    
    // Check if adding the new chemical would exceed MAX_HEIGHT
    if (currentHeight + 17 <= MAX_HEIGHT) {
        newChemicalDiv.style.height = '17px';
        currentHeight += 17;
    } else {
        newChemicalDiv.style.height = (MAX_HEIGHT - currentHeight) + 'px'; // Adjust the remaining space
        currentHeight = MAX_HEIGHT; // Ensure it doesn't exceed the max height
    }

    contentDiv.appendChild(newChemicalDiv); // Add the new chemical at the bottom
    contentDiv.style.height = currentHeight + 'px';
    contentDiv.style.overflowY = 'auto'; // Allow vertical scrolling when content overflows

    // Move the scroll position to the bottom so new content appears at the bottom
    contentDiv.scrollTop = contentDiv.scrollHeight;

    analyzeReaction(testTubeContent);
}
function AddChemical(chemicalName) {
    const mockEvent = { 
        preventDefault: () => {}, 
        dataTransfer: { getData: () => chemicalName } // Mock the getData method to return the chemical name
    };

    const testTube = document.querySelector('.testtube'); // Target the test tube element
    mockEvent.target = testTube; // Set the test tube as the event target

    dropChemical(mockEvent); // Call the existing dropChemical function
}
    const salts = [
        { id: 1, name: 'Sodium Nitrate', anion: 'Nitrate', cation: 'Sodium' },
        { id: 2, name: 'Sodium Chloride', anion: 'Chlorine', cation: 'Sodium' },
        { id: 3, name: 'Sodium Sulphate', anion: 'Sulfate', cation: 'Sodium' },
        { id: 4, name: 'Sodium Carbonate', anion: 'Carbonate', cation: 'Sodium' },
        { id: 5, name: 'Ammonium Carbonate', anion: 'Carbonate', cation: 'Ammonium' },
        { id: 6, name: 'Sodium Acetate', anion: 'Acetate', cation: 'Sodium' },
        { id: 7, name: 'Lead Nitrate', anion: 'Nitrate', cation: 'Lead' 
        },
        { id: 8, name: 'Aluminium Chloride', anion: 'Chlorine', cation: 'Aluminium' 
        },
        { id: 9, name: 'Copper Chloride', anion: 'Chlorine', cation: 'Copper' 
        },
 { 
    id: 10, 
    name: 'Barium Chloride', 
    anion: 'Chlorine', 
    cation: 'Barium' 
},
{ 
    id: 11, 
    name: 'Zinc Sulphate', 
    anion: 'Sulphate', 
    cation: 'Zinc' 
},
{ 
    id: 12, 
    name: 'Calcium Chloride', 
    anion: 'Chlorine', 
    cation: 'Calcium' 
},
{ 
    id: 13, 
    name: 'Magnesium Chloride', 
    anion: 'Chlorine', 
    cation: 'Magnesium' 
},
    ];

    function selectSalt(saltName) {
        const salt = salts.find(s => s.name === saltName);
        selectedSalt = salt;
        document.getElementById('selected-salt').innerText = salt.name;
        document.querySelector('.salt-selection').classList.add('hidden');
        document.querySelector('.main-lab').classList.remove('hidden');
    }


function showFumes(thickness) {
    const fumes = document.querySelector('.fumes');
    
    // Show the fumes by setting display to block
    fumes.style.display = 'block';
    
    // After a slight delay, adjust the opacity based on the thickness value
    setTimeout(() => {
        fumes.style.opacity = thickness; // Fade the fumes in based on the 'thickness' value
    }, 100);
}
function showBFumes(thickness) {
  
    const fumes = document.querySelector('.bfumes');
    
    // Show the fumes by setting display to block
    fumes.style.display = 'block';
    
    // After a slight delay, adjust the opacity based on the thickness value
    setTimeout(() => {
        fumes.style.opacity = thickness; // Fade the fumes in based on the 'thickness' value
    }, 100);
}
function showPpt(colour,thickness) {
const testTube = document.querySelector('.testtube');
    const pptLayer = testTube.querySelector('.ppt-layer');
    pptLayer.style.display = 'block';
    pptLayer.style.backgroundColor = colour; pptLayer.style.opacity = thickness;
}

function analyzeWatchGlassReaction(content){
	const resultDiv = document.getElementById('result');
    const salt = selectedSalt;
    const watchglass = document.querySelector('.watchglass'); 
    const contents = document.querySelector('.content'); 
    
    if (!content.includes('Salt')) {
        resultDiv.innerText = "";
        return;}
        else {
        	contents.style.backgroundImage = "url('salt.png')";
     }
      
    // **Carbonate Anion Test** (Sodium Carbonate / Ammonium Carbonate)
     if (salt.anion === 'Acetate' && content.includes("Dil H₂SO₄")) {
        resultDiv.innerText = `Vinegar smell detected (Acetate Anion identified).`;
        contents.style.backgroundImage = "url('paste.png')";
    }
    else if (salt.cation === 'Calcium' && content.includes("Conc HCl") && content.includes("H₂O")) {
    resultDiv.innerText = `Brick red flame (Calcium Cation confirmed).`;
    hue = 0;          // Adjusted to pure red
		brightness = 30;  // Reduced for darker appearance
		contrast = 100;
		contents.style.backgroundImage = "url('paste.png')";
}
else if (salt.cation === 'Barium' && content.includes("Conc HCl") && content.includes("H₂O")) {
    resultDiv.innerText = `Pale green flame  (Barium Cation confirmed).`;
    hue = 120;         // Green hue
    brightness = 125;   // High brightness for a pale look
    contrast = 80;  
    contents.style.backgroundImage = "url('paste.png')";
}
   
}
 function analyzeReaction(content) {
    const resultDiv = document.getElementById('result');
    const salt = selectedSalt;
    const testTube = document.querySelector('.testtube'); 
    const reactionLayer = testTube.querySelector('.brisk-reaction-layer');

    if (!content.includes('Salt')) {
        resultDiv.innerText = "";
        return;
    }

    // **Carbonate Anion Test** (Sodium Carbonate / Ammonium Carbonate)
    if (salt.anion === 'Carbonate' && content.includes("Dil HCl")) {
        resultDiv.innerText = `Bubbles observed (CO₂ gas evolved, Carbonate Anion identified).`;
        reactionLayer.style.display = 'block'; 
    }

    // **Nitrate Anion Test**
    else if (salt.anion === 'Nitrate' && content.includes("Conc H₂SO₄") && content.includes("Paper Ball")) {
        resultDiv.innerText = `Brown fumes (NO₂ gas produced, Nitrate Anion identified).`;
        showBFumes(1);
        showPpt('#392e21', 0.7);
    }
    else if (salt.anion === 'Nitrate' && content.includes("Conc H₂SO₄") && content.includes("H₂O") && content.includes("Ferrous Sulphate")) {
        resultDiv.innerText = `Brown ring formed (Nitrate Anion confirmed).`;
        const ringLayer = testTube.querySelector('.ring-layer');
        ringLayer.style.opacity = 0.9; 
        ringLayer.style.display = 'block';
    }

    // **Acetate Anion Test**
    else if (salt.anion === 'Acetate' && content.includes("Dil H₂SO₄")) {
        resultDiv.innerText = `Vinegar smell detected (Acetate Anion identified).`;
    }
    else if (salt.anion === 'Acetate' && content.includes("Neutral Ferric Chloride") && content.includes("H₂O")) {
        resultDiv.innerText = `Deep red solution (Acetate Anion confirmed).`;
        showPpt('#b60000', 0.7);
    }

    // **Chloride Anion Test**
    else if (salt.anion === 'Chlorine' && content.includes("Conc H₂SO₄")) {
        if (content.includes("NH₃ dipped rod")) {
            resultDiv.innerText = `White fumes (HCl gas evolved, Chloride Anion identified).`;
            showFumes(0.8);
        } else {
            resultDiv.innerText = `Pungent smell (HCl gas evolved). NH₃ dipped rod needed for confirmation.`;
            showFumes(0.5);
        }
    }
    else if (salt.anion === 'Chlorine' && content.includes("HNO₃") && content.includes("AgNO₃") && content.includes("H₂O")) {
        resultDiv.innerText = `White precipitate (Chloride Anion confirmed).`;
        showPpt('white', 0.8);
    }

    // **Sulfate Anion Test**
    else if (salt.anion === 'Sulfate' && content.includes("BaCl₂")) {
        if (content.includes("Dil HCl")) {
            resultDiv.innerText = `White precipitate dissolves (No Sulfate Anion).`;
            showPpt('white', 0.0);
        } else {
            resultDiv.innerText = `White precipitate (Sulfate Anion identified).`;
            showPpt('white', 0.7);
        }
    }
    else if (salt.anion === 'Sulfate' && content.includes("Lead Acetate") && content.includes("H₂O")) {
        resultDiv.innerText = `White precipitate (Sulfate Anion confirmed).`;
        showPpt('white', 0.7);
    }

    // **Sulfite Anion Test**
    else if (salt.anion === 'Sulfite' && content.includes("Dil H₂SO₄")) {
        resultDiv.innerText = `Pungent SO₂ gas evolved (Sulfite Anion identified).`;
        showFumes(0.6);
    }
    else if (salt.anion === 'Sulfite' && content.includes("BaCl₂") && content.includes("H₂O")) {
        if (content.includes("Dil HCl")) {
            resultDiv.innerText = `White precipitate dissolves (Sulfite Anion confirmed).`;
            showPpt('white', 0.0);
        } else {
            resultDiv.innerText = `White precipitate (Possible Sulfite or Sulfate Anion).`;
            showPpt('white', 0.7);
        }
    }

    // **Phosphate Anion Test**
    else if (salt.anion === 'Phosphate' && content.includes("Ammonium Molybdate") && content.includes("Conc HNO₃") && content.includes("H₂O")) {
        resultDiv.innerText = `Yellow precipitate (Phosphate Anion confirmed).`;
        showPpt('yellow', 0.8);
    }

    // **Borate Anion Test**
    else if (salt.anion === 'Borate' && content.includes("H₂SO₄") && content.includes("Methanol") && content.includes("Heat")) {
        resultDiv.innerText = `Green flame observed (Borate Anion confirmed).`;
    }

    // **Cyanide Anion Test**
    else if (salt.anion === 'Cyanide' && content.includes("Conc HCl") && content.includes("Ferrous Sulphate") && content.includes("H₂O")) {
        resultDiv.innerText = `Prussian blue precipitate (Cyanide Anion identified).`;
        showPpt('#003366', 0.8);
    }

    // **Thiosulfate Anion Test**
    else if (salt.anion === 'Thiosulfate' && content.includes("Dil HCl")) {
        resultDiv.innerText = `Sulfur precipitate and SO₂ gas evolved (Thiosulfate Anion identified).`;
        showPpt('yellow', 0.7);
        showFumes(0.5);
    }

// **Ammonium Cation Test**
else if (salt.cation === 'Ammonium' && content.includes("Sodium Carbonate") && content.includes("H₂O")) {
    resultDiv.innerText = `No precipitate (Group 0 identified).`;
}
else if (salt.cation === 'Ammonium' && content.includes("Nessler’s reagent") && content.includes("H₂O")) {
    resultDiv.innerText = `Brown precipitate forms (Ammonium Cation confirmed).`;
    showPpt("#392c1e", 0.9);
}
    // **Default Case (No Reaction)**
    else if (salt.cation === 'Ammonium' && content.includes("NaOH") && content.includes("Heat") && content.includes("H₂O")) {
    if (content.includes("Dil HCl")) {
        resultDiv.innerText = `Pungent smell of ammonia gas evolves, and white fumes form when dilute HCl is added (Ammonium Cation confirmed).`;
        showFumes(1);
    } else {
        resultDiv.innerText = `Pungent smell of ammonia gas evolves (Ammonium Cation identified).`;
    }
}
else if (salt.cation === 'Ammonium' && content.includes("Nessler’s reagent") && content.includes("H₂O")) {
    resultDiv.innerText = `Brown precipitate forms (Ammonium Cation confirmed).`;
    showPpt("#392c1e", 0.9);
}

// **Lead Cation Test**
else if ((salt.cation === 'Lead' || salt.cation === 'Barium') && content.includes("Dil Acetic acid") && content.includes("Potassium chromate") && content.includes("H₂O")) {
    resultDiv.innerText = `Yellow precipitate (Lead/Barium Cation identified).`;
    showPpt("yellow", 0.8);
}
else if (salt.cation === 'Lead' && content.includes("Potassium iodide") && content.includes("H₂O")) {
    resultDiv.innerText = `Yellow precipitate (Lead Cation confirmed).`;
    showPpt("yellow", 0.8);
}
else if (salt.cation === 'Lead' && content.includes("Dil HCl") && content.includes("H₂O")) {
    resultDiv.innerText = `White precipitate (Group 1 Cation Pb).`;
    showPpt('white', 0.8);
}

// **Copper Cation Test**
else if (salt.cation === 'Copper' && content.includes("H₂O") && content.includes("H₂S") && content.includes("Dil HCl")) {
    resultDiv.innerText = `Black precipitate (Copper Cation identified).`;
    showPpt('black', 0.8);
}
else if (salt.cation === 'Copper' && content.includes("NH₄OH") && content.includes("H₂O")) {
    resultDiv.innerText = `Pale blue precipitate (Copper Cation identified).`;
    showPpt("#4d95e6", 0.8);
}

// **Aluminium Cation Test**
else if (salt.cation === 'Aluminium' && content.includes("NH₄Cl") && content.includes("NH₄OH") && content.includes("H₂O")) {
    resultDiv.innerText = `White gelatinous precipitate (Group 3 identified).`;
    const gpptLayer = testTube.querySelector('.gppt-layer');
    gpptLayer.style.display = 'block';
}
else if (salt.cation === 'Aluminium' && content.includes("Conc HNO₃") && content.includes("Cobalt Nitrate") && content.includes("Heat") && content.includes("H₂O")) {
    resultDiv.innerText = `Blue residue forms (Aluminium Cation confirmed).`;
    ashcolor = "blue-ash.png";
}
else if (salt.cation === 'Aluminium' && content.includes("NaOH") && content.includes("H₂O")) {
    resultDiv.innerText = `White gelatinous precipitate (Aluminium Cation identified).`;
    const gpptLayer = testTube.querySelector('.gppt-layer');
    gpptLayer.style.display = 'block';
}

// **Zinc Cation Test**
else if (salt.cation === 'Zinc' && content.includes("NH₄Cl") && content.includes("NH₄OH") && content.includes("H₂S") && content.includes("H₂O")) {
    resultDiv.innerText = `White precipitate (Group 4 Cation Zn identified).`;
    showPpt("white", 0.8);
}
else if (salt.cation === 'Zinc' && content.includes("Conc HNO₃") && content.includes("Cobalt Nitrate") && content.includes("Heat") && content.includes("H₂O")) {
    resultDiv.innerText = `Green residue forms (Zinc Cation confirmed).`;
    ashcolor = "green-ash.png";
}
else if (salt.cation === 'Zinc' && content.includes("NaOH") && content.includes("H₂O")) {
    resultDiv.innerText = `White precipitate (Zinc Cation identified).`;
    showPpt("white", 0.8);
}

// **Magnesium Cation Test**
else if (salt.cation === 'Magnesium' && content.includes("NH₄Cl") && content.includes("NH₄OH") && content.includes("H₂O")) {
    resultDiv.innerText = `White crystalline precipitate (Group 4 cation Magnesium).`;
    const gpptLayer = testTube.querySelector('.gppt-layer');
    gpptLayer.style.display = 'block';
}
else if (salt.cation === 'Magnesium' && content.includes("Conc HNO₃") && content.includes("Cobalt Nitrate") && content.includes("H₂O") && content.includes("Heat")) {
    resultDiv.innerText = `Pink residue forms (Magnesium Cation confirmed).`;
    ashcolor = "pink-ash.png";
}
else if (salt.cation === 'Magnesium' && content.includes("Magneson reagent") && content.includes("NaOH") && content.includes("H₂O")) {
    resultDiv.innerText = `Blue precipitate (Magnesium Cation confirmed).`;
    showPpt("#0a6aff", 0.9);
}

// **Calcium Cation Test**
else if (salt.cation === 'Calcium' && content.includes("NH₄OH") && content.includes("NH₄Cl") && content.includes("Ammonium oxalate") && content.includes("H₂O")) {
    resultDiv.innerText = `White precipitate (group 5 calcium Cation identified).`;
    showPpt("white", 0.9);
}

// **Barium & Calcium Cation Test**
else if ((salt.cation === 'Barium' || salt.cation === 'Calcium') && content.includes("NH₄Cl") && content.includes("NH₄OH") && content.includes("NH₄₂CO₃") && content.includes("H₂O")) {
    resultDiv.innerText = `White crystalline precipitate (Barium/Calcium Cation identified).`;
}

// **Sodium Cation Test**
else if (salt.cation === 'Sodium' && content.includes("NaOH") && content.includes("H₂O")) {
    resultDiv.innerText = `No visible reaction (Sodium Cation identified).`;
}



// Flame test
else if (salt.cation === 'Calcium' && content.includes("Conc HCl") && content.includes("H₂O")) {
    resultDiv.innerText = `Brick red flame (Calcium Cation confirmed).`;
    hue = 0;          // Adjusted to pure red
		brightness = 30;  // Reduced for darker appearance
		contrast = 100;
}
else if (salt.cation === 'Barium' && content.includes("Conc HCl") && content.includes("H₂O")) {
    resultDiv.innerText = `Pale green flame  (Barium Cation confirmed).`;
    hue = 120;         // Green hue
    brightness = 125;   // High brightness for a pale look
    contrast = 80;  
}
// **Default Case (No Reaction)**
else if ((salt.cation === 'Copper' || salt.cation === 'Cadmium') && content.includes("H₂S") && content.includes("Dil HCl") && content.includes("H₂O")) {
    resultDiv.innerText = `Black precipitate (Copper/Cadmium identified as Group 2 cation).`;
    showPpt('black', 0.8);
}

// **Group 2: Copper (II) & Bismuth (III) - H₂S in Dil HCl Medium**
else if ((salt.cation === 'Copper' || salt.cation === 'Bismuth') && content.includes("H₂S") && content.includes("Dil HCl") && content.includes("H₂O")) {
    resultDiv.innerText = `Black precipitate (Copper/Bismuth Cation - Group 2 Identified).`;
    showPpt("black", 0.8);
}

// **Group 2: Bismuth (III) Confirmation - NaOH Test**
else if (salt.cation === 'Bismuth' && content.includes("NaOH") && content.includes("H₂O")) {
    resultDiv.innerText = `White precipitate dissolves in excess NaOH (Bismuth Cation Confirmed).`;
    showPpt("white", 0.8);
}

// **Group 3: Aluminium & Iron (III) - NH₄OH in NH₄Cl Medium**
else if ((salt.cation === 'Aluminium' || salt.cation === 'Iron(III)') && content.includes("NH₄Cl") && content.includes("NH₄OH") && content.includes("H₂O")) {
    if (salt.cation === 'Aluminium') {
        resultDiv.innerText = `White gelatinous precipitate (Aluminium Cation - Group 3 Identified).`;
        showPpt("white", 0.8);
    } else if (salt.cation === 'Iron(III)') {
        resultDiv.innerText = `Reddish-brown precipitate (Iron(III) Cation - Group 3 Identified).`;
        showPpt("#8b0000", 0.8);
    }
}

// **Iron (III) Confirmation - Potassium Ferrocyanide Test**
else if (salt.cation === 'Iron(III)' && content.includes("K₄[Fe(CN)₆]") && content.includes("H₂O")) {
    resultDiv.innerText = `Prussian blue precipitate (Iron(III) Cation Confirmed).`;
    showPpt("#003366", 0.9);
}

// **Group 4: Zinc & Manganese - H₂S in NH₄OH Medium**
else if ((salt.cation === 'Zinc' || salt.cation === 'Manganese') && content.includes("H₂S") && content.includes("NH₄OH") && content.includes("H₂O")) {
    if (salt.cation === 'Zinc') {
        resultDiv.innerText = `White precipitate (Zinc Cation - Group 4 Identified).`;
        showPpt("white", 0.8);
    } else if (salt.cation === 'Manganese') {
        resultDiv.innerText = `Light pink precipitate (Manganese Cation - Group 4 Identified).`;
        showPpt("#ff69b4", 0.8);
    }
}

// **Manganese Confirmation - Sodium Bismuthate Test**
else if (salt.cation === 'Manganese' && content.includes("Sodium Bismuthate") && content.includes("HNO₃") && content.includes("H₂O")) {
    resultDiv.innerText = `Purple solution (Manganese Cation Confirmed).`;
}

// **Group 5: Calcium, Strontium, Barium - (NH₄)₂CO₃ in NH₄OH Medium**
else if ((salt.cation === 'Calcium' || salt.cation === 'Strontium' || salt.cation === 'Barium') && 
    content.includes("NH₄OH") && content.includes("NH₄Cl") && content.includes("(NH₄)₂CO₃") && content.includes("H₂O")) {
    resultDiv.innerText = `White precipitate (Group 5 Cation Identified - Ca²⁺, Sr²⁺, Ba²⁺).`;
    showPpt("white", 0.8);
}

// **Strontium Confirmation - Ammonium Sulfate Test**
else if (salt.cation === 'Strontium' && content.includes("Ammonium Sulfate") && content.includes("H₂O")) {
    resultDiv.innerText = `White precipitate (Strontium Cation Confirmed).`;
    showPpt("white", 0.8);
}

// **Group 6: Magnesium - NH₄OH in NH₄Cl Medium**
else if (salt.cation === 'Magnesium' && content.includes("NH₄OH") && content.includes("NH₄Cl") && content.includes("H₂O")) {
    resultDiv.innerText = `White precipitate (Magnesium Cation - Group 6 Identified).`;
    showPpt("white", 0.8);
}

// **Magnesium Confirmation - Sodium Phosphate Test**
else if (salt.cation === 'Magnesium' && content.includes("Na₂HPO₄") && content.includes("NH₄OH") && content.includes("H₂O")) {
    resultDiv.innerText = `White crystalline precipitate (Magnesium Cation Confirmed).`;
    showPpt("white", 0.9);
}

// **Lithium Identification - NaOH Test**
else if (salt.cation === 'Lithium' && content.includes("NaOH") && content.includes("H₂O")) {
    resultDiv.innerText = `No precipitate (Lithium Cation Identified).`;
}

// **Lithium Confirmation - Sodium Cobaltinitrite Test**
else if (salt.cation === 'Lithium' && content.includes("Sodium Cobaltinitrite") && content.includes("H₂O")) {
    resultDiv.innerText = `Yellow precipitate (Lithium Cation Confirmed).`;
    showPpt("yellow", 0.8);
}

// **Rubidium & Cesium Identification - Cobaltinitrite Test**
else if ((salt.cation === 'Rubidium' || salt.cation === 'Cesium') && content.includes("Sodium Cobaltinitrite") && content.includes("H₂O")) {
    if (salt.cation === 'Rubidium') {
        resultDiv.innerText = `Yellow precipitate (Rubidium Cation Identified).`;
        showPpt("yellow", 0.8);
    } else if (salt.cation === 'Cesium') {
        resultDiv.innerText = `Orange precipitate (Cesium Cation Identified).`;
        showPpt("orange", 0.8);
    }
}

// **Silver Identification - HCl Test**
else if (salt.cation === 'Silver' && content.includes("Dil HCl") && content.includes("H₂O")) {
    resultDiv.innerText = `White precipitate (Silver Cation Identified).`;
    showPpt("white", 0.8);
}

// **Silver Confirmation - Ammonia Test**
else if (salt.cation === 'Silver' && content.includes("NH₄OH") && content.includes("H₂O")) {
    resultDiv.innerText = `Precipitate dissolves in excess NH₄OH (Silver Cation Confirmed).`;
}

// **Nickel Identification - DMG Test**
else if (salt.cation === 'Nickel' && content.includes("Dimethylglyoxime") && content.includes("H₂O")) {
    resultDiv.innerText = `Bright red precipitate (Nickel Cation Identified).`;
    showPpt("red", 0.8);
}

// **Cobalt Identification - Potassium Ferrocyanide Test**
else if (salt.cation === 'Cobalt' && content.includes("K₄[Fe(CN)₆]") && content.includes("H₂O")) {
    resultDiv.innerText = `Greenish-brown precipitate (Cobalt Cation Identified).`;
    showPpt("#8B4513", 0.8);
}

else {
    resultDiv.innerText = `No visible reaction detected.`;

}
}

function resetLab() {
    // Reset test tube content
    testTubeContent = [];
    currentHeight = 0;

    // Reset displayed content inside test tube
    const testTube = document.querySelector('.testtube');
    const contentDiv = testTube.querySelector('.content');
    contentDiv.innerHTML = "";
    contentDiv.style.height = "0px"; // Shrink back to empty state
    contentDiv.style.overflowY = "hidden"; // Prevent unnecessary scrolling

    // Reset visual effects
    const reactionLayer = testTube.querySelector('.brisk-reaction-layer');
    const pptLayer = testTube.querySelector('.ppt-layer');
    const gpptLayer = testTube.querySelector('.gppt-layer');
    const ringLayer = testTube.querySelector('.ring-layer');
    const fumes = document.querySelector('.fumes');
    const bfumes = document.querySelector('.bfumes');

    
    reactionLayer.style.display = 'none';
    pptLayer.style.display = 'none';
    gpptLayer.style.display = 'none';
    ringLayer.style.display = 'none';
    fumes.style.display = 'none';
    bfumes.style.display = 'none';

    // Reset flame effects
    hue = 360;
    brightness = 100;
    contrast = 100;

    // Reset ash color
    ashcolor = "paper.png";
    changeAsh(ashcolor);
    ashcolor = "brown-ash.png";
    // Reset UI elements like results, salt selection, and test tube positioning
    document.getElementById('result').innerText = "";
    
    // Reset dragging-related flags
    risDragging = false;
    pisDragging = false;
    tisDragging = false;
    rdipped = false;
    pdipped = false;
    heating = false;

    // Reset the test tube's position (if draggable)
    testTube.style.position = "static";
    testTube.style.left = "";
    testTube.style.top = "";

    // Reset start screens if needed
   
    console.log("Lab fully reset!");
}

function undoLast() {
    if (testTubeContent.length === 0) {
        console.log("Nothing to undo.");
        return; // If no chemicals are present, do nothing
    }

    // Remove the most recently added chemical
    testTubeContent.shift();  

    // Update test tube content display
    const testTube = document.querySelector('.testtube');
    const contentDiv = testTube.querySelector('.content');
    contentDiv.innerHTML = testTubeContent.map(chem => `<div style="background-color: #49ceff3e; height: 17px;">${chem}</div>`).join("");
    
    // Adjust height if possible
    currentHeight = Math.max(0, currentHeight - 17);
    contentDiv.style.height = currentHeight + "px";
    
    // Re-analyze reaction with remaining chemicals
    analyzeReaction(testTubeContent);

    // Reset all possible visual effects if no chemicals are left
    if (testTubeContent.length === 0) {
        const reactionLayer = testTube.querySelector('.brisk-reaction-layer');
        const pptLayer = testTube.querySelector('.ppt-layer');
        const gpptLayer = testTube.querySelector('.gppt-layer');
        const ringLayer = testTube.querySelector('.ring-layer');
        const fumes = document.querySelector('.fumes');
        const bfumes = document.querySelector('.bfumes');

        reactionLayer.style.opacity = 0;
        reactionLayer.style.display = 'none';
        pptLayer.style.display = 'none';
        gpptLayer.style.display = 'none';
        ringLayer.style.display = 'none';
        fumes.style.display = 'none';
        bfumes.style.display = 'none';

        // Reset flame effects
        hue = 360;
        brightness = 100;
        contrast = 100;
    }

    console.log("Last action undone.");
}