let testTubeContent = [];
    let selectedSalt = "";
//greenblue 100 , blue 160, pink 250

const circle = document.querySelector('.circle');
const stick = document.querySelector('.stick');
const paper = document.querySelector('.paper');

let risDragging = false; 
let rdipped = false;
let pisDragging = false; 
let pdipped = false;
let hue = 360;
let brightness = 100;
let contrast = 100; 
let ashcolor= "paper.png";// Correct way to represent an array of numbers // Change dynamically if needed

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

  // Prevent text or elements from being highlighted
  e.preventDefault();
});

paper.addEventListener('touchstart', (e) => {
  pisDragging = true;

  // Store initial touch and paper positions
  paper.dataset.offsetX = e.touches[0].clientX - paper.offsetLeft;
  paper.dataset.offsetY = e.touches[0].clientY - paper.offsetTop;

  // Prevent text or elements from being highlighted
  e.preventDefault();
});

document.addEventListener('touchmove', (e) => {
  if (risDragging) {
    e.preventDefault(); // Prevent scrolling on touch move

    // Calculate new position for the stick
    const offsetX = stick.dataset.offsetX;
    const offsetY = stick.dataset.offsetY;

    stick.style.position = "absolute"; // Ensure it's absolute
    stick.style.left = `${e.touches[0].clientX - offsetX}px`;
    stick.style.top = `${e.touches[0].clientY - offsetY}px`;

    // Collision detection between stick and circle
    const stickRect = stick.getBoundingClientRect();
    const circleRect = circle.getBoundingClientRect();
    const testTube = document.querySelector('.testtube');
    const testTubeRect = testTube.getBoundingClientRect();

    if (
      stickRect.top < circleRect.bottom &&
      stickRect.bottom > circleRect.top &&
      stickRect.left < circleRect.right &&
      stickRect.right > circleRect.left
    ) {
      if (rdipped === true) {
        changeHue(hue, brightness, contrast);
      }
    } else {
      changeHue(360, 100, 100);
    }

    // Check if the stick is near the test tube (top part)
    if (
      stickRect.bottom > testTubeRect.top &&
      stickRect.top < testTubeRect.top &&
      testTubeRect.left < stickRect.right &&
      testTubeRect.right > stickRect.left
    ) {
      rdipped = true;
      setTimeout(() => {
        rdipped = false;
      }, 4000);
    }
  }

  if (pisDragging) {
    e.preventDefault(); // Prevent scrolling on touch move

    // Calculate new position for the paper
    const offsetX = paper.dataset.offsetX;
    const offsetY = paper.dataset.offsetY;

    paper.style.position = "absolute"; // Ensure it's absolute
    paper.style.left = `${e.touches[0].clientX - offsetX}px`;
    paper.style.top = `${e.touches[0].clientY - offsetY}px`;

    // Collision detection between paper and circle
    const paperRect = paper.getBoundingClientRect();
    const circleRect = circle.getBoundingClientRect();
    const testTube = document.querySelector('.testtube');
    const testTubeRect = testTube.getBoundingClientRect();

    if (
      paperRect.top < circleRect.bottom &&
      paperRect.bottom > circleRect.top &&
      paperRect.left < circleRect.right &&
      paperRect.right > circleRect.left
    ) {
  if (pdipped === true) {
        changeAsh(ashcolor);
  }
  
     
}
    // Check if the paper is near the test tube (top part)
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
});

document.addEventListener('touchend', () => {
  risDragging = false; // Stop dragging for the stick
  pisDragging = false; // Stop dragging for the paper
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


 function analyzeReaction(content) {
    const resultDiv = document.getElementById('result');
    const salt = selectedSalt;
const testTube = document.querySelector('.testtube'); // Select the test-tube element
        const reactionLayer = testTube.querySelector('.brisk-reaction-layer');
        
    // Reaction only happens after adding salt
    if (!content.includes('Salt')) {
        resultDiv.innerText = "";
        return;
    }

    // Check for specific anion and cation-based reactions

    // Soate (Carbonate Anion)
    if (salt.anion === 'Carbonate' && content.includes("Dil HCl")) {
        resultDiv.innerText = `Bubbles observed (CO₂ gas evolved, Carbonate Anion identified).`;
         // Get the reaction layer
       
       reactionLayer.style.display = 'block'; 

    }
    
    // Ammonium Carbonate (Carbonate Anion)
  
    
    // Sodium Nitrate (Nitrate Anion) with Conc H₂SO₄ and Paper Ball
    else if (salt.anion === 'Nitrate' && content.includes("Conc H₂SO₄") && content.includes("Paper Ball")) {
        resultDiv.innerText = `Brown fumes (NO₂ gas produced, Nitrate Anion identified).`;
        showBFumes(1);
        showPpt('#392e21',0.7)
    }
    
    else if (salt.anion === 'Nitrate' && content.includes("Conc H₂SO₄") && content.includes("H₂O")&& content.includes("Ferrous Sulphate")) {
        resultDiv.innerText = `Brown ring formed ( Nitrate Anion).`;
        
        const testTube = document.querySelector('.testtube');
        const ringLayer = testTube.querySelector('.ring-layer');
        ringLayer.style.opacity = 0.9; 
      ringLayer.style.display = 'block';
    }
    // Sodium Acetate (Acetate Anion) with Dil H₂SO₄
    else if (salt.anion === 'Acetate' && content.includes("Dil H₂SO₄")) {
        resultDiv.innerText = `Vinegar smell (Acetate Anion identified).`;
    }///eror ann
    
    else if (salt.anion === 'Acetate' && content.includes("Neutral Ferric Chloride") && content.includes("H₂O")) {
        resultDiv.innerText = `Deep red ppt(Acetate Anion).`;
        showPpt('#b60000',0.7)
    }
    
    // Sodium Chloride (Chlorine Anion) with Conc H₂SO₄ and NH₃ rdipped rod
    // Sodium Chloride (Chlorine Anion) with Conc H₂SO₄ and NH₃ dipped rod
else if (salt.anion === 'Chlorine' && content.includes("Conc H₂SO₄")) {
    // Check if both Conc H₂SO₄ and NH₃ dipped rod are included
    if (content.includes("NH₃ dipped rod")) {
        resultDiv.innerText = `White fumes (HCl gas evolved, Chlorine Anion identified).`;
        showFumes(0.8); // Display white fumes with specific opacity
    } else {
        resultDiv.innerText = `Pungent smell (HCl gas evolved). NH₃ dipped rod needed to confirm Chlorine Anion.`;
        showFumes(0.5); // Display faint fumes
    }
}

else if (salt.anion === 'Chlorine' && content.includes("HNO₃") && content.includes("AgNO₃") && content.includes("H₂O")) {
        resultDiv.innerText = `White ppt.`;
        
        showPpt('white',0.8)
    }
    // Sulfate Anion (BaCl₂ test for sulfate)
    
else if ((salt.anion === 'Sulfate' || salt.anion === 'Carbonate') && content.includes("BaCl₂")) {
    // Your logic here

    // Check if both Conc H₂SO₄ and NH₃ dipped rod are included
    if (content.includes("Dil HCl")) {
        resultDiv.innerText = `White ppt diluted.`;
        
        showPpt('white',0.0)
    } else {
      showPpt('white',0.7)
        resultDiv.innerText = `white ppt formed.`;
         // Partial opacity (0.5) when only Conc H₂SO₄ is present
    }
}
else if (salt.anion === 'Sulfate' && content.includes("Lead Acetate") && content.includes("H₂O")){
  showPpt('white',7.0)
        resultDiv.innerText = `White ppt (sulphate).`;
    }


    // Ammonium Carbonate (Ammonium Cation) with NaOH and H₂O
    else if (salt.cation === 'Ammonium' && content.includes("Sodium Carbonate") && content.includes("H₂O")) {
        resultDiv.innerText = `No ppt, Ammonium Cation identified).`;
    }
    
else if (salt.cation === 'Copper' && content.includes("H₂O") && content.includes("H₂S")&& content.includes("Dil HCl")) {
        resultDiv.innerText = `black ppt( copper).`;
   showPpt('black',0.8)     
}
    
else if (salt.cation === 'Aluminium' && content.includes("NH₄Cl") && content.includes("NH₄OH") && content.includes("H₂O")) {
        resultDiv.innerText = `White gelatinous ppt( Aluminium).`;
        const testTube = document.querySelector('.testtube');
   const gpptLayer = testTube.querySelector('.gppt-layer');
    gpptLayer.style.display = 'block';
    
}

if ((salt.cation === 'Barium' || salt.cation === 'Calcium') && 
    content.includes("NH₄Cl") && 
    content.includes("NH₄OH") && 
    content.includes("NH₄₂CO₃") && content.includes("H₂O")) {
        
    resultDiv.innerText = `White crystalline ppt (Barium/Calcium).`;
    const testTube = document.querySelector('.testtube');
    // const gpptLayer = testTube.querySelector('.gppt-layer');
    // gpptLayer.style.display = 'block';
}else if (salt.cation === 'Zinc' && content.includes("NH₄Cl") && content.includes("NH₄OH") && content.includes("H₂S") && content.includes("H₂O")) {
        resultDiv.innerText = `White ppt( Zinc).`;
        showPpt("white",0.8)
    
}
else if (salt.cation === 'Magnesium' && content.includes("NH₄Cl") && content.includes("NH₄OH") && content.includes("H₂O")) {
        resultDiv.innerText = `White crystalline ppt(Magnesium).`;
        const testTube = document.querySelector('.testtube');
   const gpptLayer = testTube.querySelector('.gppt-layer');
    gpptLayer.style.display = 'block';
}

    // Lead Nitrate (Lead Cation) with BaCl₂
    else if (salt.cation === 'Lead' && content.includes("Dil HCl") && content.includes("H₂O")) {
        resultDiv.innerText = `White precipitate (Group I cation lead).`;
        showPpt('white',0.8)
    }

    // Sodium (Sodium Cation) with NaOH
    else if (salt.cation === 'Sodium' && content.includes("NaOH") && content.includes("H₂O")) {
        resultDiv.innerText = `No visible reaction (Sodium Cation identified).`;
    }





/// cation identification and conformation
////////////////////
else if (salt.cation === 'Ammonium' && content.includes("NaOH") && content.includes("Heat") && content.includes("H₂O")) {
    if (content.includes("Dil HCl")) {
        resultDiv.innerText = `Pungent smell of ammonia gas evolves, and white fumes form when dilute HCl is added.`;
      
        showFumes(1);
    } else {
        resultDiv.innerText = `Pungent smell of ammonia gas evolves`;
    }

} else if (salt.cation === 'Ammonium' && content.includes("Nessler’s reagent") && content.includes("H₂O")) {
    resultDiv.innerText = `Brown precipitate forms (Ammonium cation confirmed).`;
    showPpt("#392c1e", 0.9);
} 

else if ((salt.cation === 'Lead' || salt.cation ==='Barium')&& content.includes("Dil Acetic acid") && content.includes("Potassium chromate") && content.includes("H₂O")) {
    resultDiv.innerText = `White precipitate forms (Lead /barium cation identified).`;
    showPpt("white", 0.8);
} else if (salt.cation === 'Lead' && content.includes("Potassium iodide") && content.includes("H₂O")) {
    resultDiv.innerText = `Yellow precipitate forms (Lead cation confirmed).`;
    showPpt("yellow", 0.8);
}

else if (salt.cation === 'Copper' && content.includes("NH₄OH") && content.includes("H₂O")) {
    resultDiv.innerText = `Pale Blue precipitate  (Copper cation identified).`;
    showPpt("#4d95e6", 0.8);
    
    
} else if (salt.cation === 'Copper' && content.includes("Conc HCl") && content.includes("H₂O")) {
  hue=130;
  brightness=100;
  contrast=100;
    resultDiv.innerText = `Blue-green flame observed (Copper cation confirmed).`;
    
}
else if (salt.cation === 'Calcium' && content.includes("Conc HCl") && content.includes("H₂O")) {
    resultDiv.innerText = `Brick red flame observed (Calcium cation confirmed).`;
    hue = 0;          // Adjusted to pure red
		brightness = 30;  // Reduced for darker appearance
		contrast = 100;   // Retained for vibrant dark red
    
} else if (salt.cation === 'Barium' && content.includes("Conc HCl") && content.includes("H₂O")) {
    resultDiv.innerText = `pale green flame observed (Barium cation).`;
    hue = 120;         // Green hue
    brightness = 125;   // High brightness for a pale look
    contrast = 80;     // Slightly reduced contrast for softness

	
}else if (salt.cation === 'Aluminium' && content.includes("NaOH") && content.includes("H₂O")) {
    resultDiv.innerText = `White gelatinous precipitate (Aluminium cation identified).`;
    const testTube = document.querySelector('.testtube');
    const gpptLayer = testTube.querySelector('.gppt-layer');
    gpptLayer.style.display = 'block';
    
} else if (salt.cation === 'Aluminium' &&  content.includes("Conc HNO₃") && content.includes("Cobalt Nitrate") && content.includes("Heat") && content.includes("H₂O")) {
    resultDiv.innerText = `Blue ash forms on heating with cobalt nitrate (Aluminium cation confirmed).`;
    ashcolor= "blue-ash.png"
}
else if (salt.cation === 'Zinc' && content.includes("Conc HNO₃") && content.includes("Cobalt Nitrate") && content.includes("Heat") && content.includes("H₂O")) {
    resultDiv.innerText = `Green ash forms on heating with cobalt nitrate (Zinc cation confirmed).`;
    ashcolor= "green-ash.png"
}
else if (salt.cation === 'Magnesium' && content.includes("Conc HNO₃") && content.includes("Cobalt Nitrate") && content.includes("H₂O")&& content.includes("Heat")) {
    resultDiv.innerText = `pink ash forms (Magnesium cation confirmed).`;
    ashcolor= "pink-ash.png"
}

else if (salt.cation === 'Zinc' && content.includes("NaOH") && content.includes("H₂O")) {
    resultDiv.innerText = `White precipitate forms (Zinc cation identified).`;
    showPpt("white", 0.8);
    
} 

else if (salt.cation === 'Calcium' && content.includes("NH₄OH") && content.includes("NH₄Cl") && content.includes("Ammonium oxalate") && content.includes("H₂O")) {
    resultDiv.innerText = `White precipitate (Calcium cation identified).`;
    showPpt("white",0.9)
}
else if (salt.cation === 'Magnesium' && content.includes("Magneson reagent") && content.includes("NaOH") && content.includes("H₂O")) {
   resultDiv.innerText = `Blue precipitate (Magnesium cation confirmed).`;
    showPpt("#0a6aff", 0.9);
    
}
    

else if (salt.cation === 'Magnesium' && content.includes("Magneson reagent") && content.includes("NaOH") && content.includes("H₂O")) {
    resultDiv.innerText = `Blue precipitate forms (Magnesium cation confirmed).`;
    showPpt("#0a6aff", 0.9);
}





    // Default message if no specific reaction matches
    else {
        resultDiv.innerText = `No visible reaction detected.`;
    }
}

function resetLab() {
          currentHeight=0
    // Clear the test tube content and reset the display
    const testTube = document.querySelector('.testtube'); // Select the test-tube element
        const reactionLayer = testTube.querySelector('.brisk-reaction-layer');
    
      reactionLayer.style.opacity = 0; 
      reactionLayer.style.display = 'none';
    ashcolor = "paper.png";
    changeAsh(ashcolor)
    hue = 360;         // Green hue
    brightness = 100;   // High brightness for a pale look
    contrast = 100; 
    testTubeContent = [];
    document.getElementById('testtube1').querySelector('.content').innerHTML = "";
    document.getElementById('result').innerText = "";
    
}

function undoLast() {
  const testTube = document.querySelector('.testtube'); // Select the test-tube element
        const reactionLayer = testTube.querySelector('.brisk-reaction-layer');
    // Remove the most recent chemical added
    testTubeContent.shift();  // Remove from the top (upward stack)
     reactionLayer.style.opacity = 0; 
       reactionLayer.style.display = 'none'; 
    // Re-render the test tube content with remaining chemicals
    const contentDiv = document.getElementById('testtube1').querySelector('.content');
    contentDiv.innerHTML = testTubeContent.join("<br>");
    currentHeight = currentHeight-30
    // Re-analyze the reaction with updated content
    analyzeReaction(testTubeContent);
}
    