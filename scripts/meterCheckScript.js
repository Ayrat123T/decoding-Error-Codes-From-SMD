const singlePhaseMeterBlock = document.getElementById('SinglePhaseMeter');
const threePhaseMeterBlock = document.getElementById('ThreePhaseMeter');
const threePhaseMeterCheckBox = document.getElementById('ThreePhaseMeterCheckBox');

const currentTransformerTransformationRatio = document.getElementById('CurrentTransformerTransformationRatio');
const powerFactor = document.getElementById('PowerFactor');
const voltageMeterCheck = document.getElementById('VoltageMeterCheck');
const currentMeterCheck = document.getElementById('CurrentMeterCheck');
const voltageMeterCheck_B = document.getElementById('VoltageMeterCheck_B');
const currentMeterCheck_B = document.getElementById('CurrentMeterCheck_B');
const voltageMeterCheck_C = document.getElementById('VoltageMeterCheck_C');
const currentMeterCheck_C = document.getElementById('CurrentMeterCheck_C');
const impsMeterCheck = document.getElementById('ImpsMeterCheck');
const impNumMeterCheck = document.getElementById('ImpNumMeterCheck');

threePhaseMeterCheckBox.addEventListener("click", () => {
    if (threePhaseMeterCheckBox.checked) {
        threePhaseMeterBlock.style["display"] = "";
        document.getElementById('FirstVoltageMeterLabel').innerText = 'Ua[В] = ';
        document.getElementById('FirstCurrentMeterLabel').innerText = 'Ia[А] = ';
    } else {
        threePhaseMeterBlock.style["display"] = "none";
        document.getElementById('FirstVoltageMeterLabel').innerText = 'U[В] = ';
        document.getElementById('FirstCurrentMeterLabel').innerText = 'I[А] = ';
    }
});

const StartMeterCheckBtn = document.getElementById('StartMeterCheck');
StartMeterCheckBtn.addEventListener('click', startMeterCheck);

function CheckAllInputs() {
    if (impNumMeterCheck.value != '' && impsMeterCheck.value != '' &&
        voltageMeterCheck.value != '' && currentMeterCheck.value != '' &&
        currentTransformerTransformationRatio.value >= 0 && powerFactor.value >= 0 &&
        currentTransformerTransformationRatio.value != '' && powerFactor.value != '' &&
            (!threePhaseMeterCheckBox.checked ||
            (voltageMeterCheck_B.value != '' && currentMeterCheck_B.value != '' &&
            voltageMeterCheck_C.value != '' && currentMeterCheck_C.value != ''))) {
                return true;
            }
            return false;
}

function startMeterCheck(e) {
    // Button is inside a form: prevent accidental page reload.
    e.preventDefault();

    // If the timer is running, allow stopping even if inputs become invalid.
    if (StartMeterCheckBtn.innerText !== 'Старт▶') {
        calcMeterAccuracyAndShowRes(e);
        return;
    }

    if (!CheckAllInputs()) return;

    if (currentTransformerTransformationRatio.value <= 0) {
        alert('Ктт не должен быть равен 0');
    } else if (powerFactor.value == 0) {
        alert('cos(φ) не должен быть равен 0');
    } else {
        seconds = 0.0;
        minutes = 0;
        hours = 0;
        energy = 0.0;
        interval = setInterval(updateTimeAndEnergy, 100);
        StartMeterCheckBtn.innerText = 'Стоп⛔️';
        StartMeterCheckBtn.style["background-color"] = "red";
        document.getElementById('resultMeterCheck').style["display"] = "none";
    }
}

let timer = document.getElementById('timer');
let resetBtn = document.getElementById('resetMeterCheck');
let calcEnergy = document.getElementById('CalcEnergy');
let calcPower = document.getElementById('CalcPower');
let power;
let seconds = 0.0;
let minutes = 0;
let hours = 0;
let energy = 0.0;
let interval;

function updateTimeAndEnergy() {
    seconds += 0.1;
    if (seconds >= 60.0) {
        minutes++;
        seconds = 0.0;
    }
    if (minutes == 60) {
        hours++;
        minutes = 0;
    }
    timer.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toFixed(1).toString().padStart(2, '0')}`;
    updatePower();
    updateEnergy();
}

function updatePower() {
    power = voltageMeterCheck.value * currentMeterCheck.value;
    if (threePhaseMeterCheckBox.checked) {
        power += voltageMeterCheck_B.value * currentMeterCheck_B.value + 
        voltageMeterCheck_C.value * currentMeterCheck_C.value;
    }
    power *= currentTransformerTransformationRatio.value * powerFactor.value;
    calcPower.textContent = 'Pрасч = ' +  power.toFixed(1).toString() + ' Вт;  ';
}

function updateEnergy() {
    energy += power / 1000 * (hours + minutes / 60 + seconds / 3600);
    calcEnergy.textContent = 'Wрасч = ' +  energy.toFixed(1).toString() + ' кВт*ч';
}

resetBtn.addEventListener('click', () => {
    clearInterval(interval);
    seconds = 0.0;
    minutes = 0;
    hours = 0;
    power = 0.0;
    calcPower.textContent = 'Pрасч = ' +  power.toFixed(1).toString() + ' Вт;  ';
    energy = 0.0;
    calcEnergy.textContent ='Wрасч = ' +  energy.toFixed(1).toString() + ' кВт*ч';
    timer.textContent = '00:00:00.0';
    StartMeterCheckBtn.innerText = 'Старт▶';
    StartMeterCheckBtn.style["background-color"] = "#77dd77";
    document.getElementById('resultMeterCheck').style["display"] = "none";
});

//const calcMeterAccuracyBtn = document.MeterCheck.CalcMeterAccuracy;
//calcMeterAccuracyBtn.addEventListener('click', calcMeterAccuracyAndShowRes);
powerFactor.addEventListener("change", calcMeterAccuracy);
currentTransformerTransformationRatio.addEventListener("change", calcMeterAccuracy);
voltageMeterCheck.addEventListener("change", calcMeterAccuracy);
currentMeterCheck.addEventListener("change", calcMeterAccuracy);
voltageMeterCheck_B.addEventListener("change", calcMeterAccuracy);
currentMeterCheck_B.addEventListener("change", calcMeterAccuracy);
voltageMeterCheck_C.addEventListener("change", calcMeterAccuracy);
currentMeterCheck_C.addEventListener("change", calcMeterAccuracy);
impsMeterCheck.addEventListener("change", calcMeterAccuracy);
impNumMeterCheck.addEventListener("change", calcMeterAccuracy);

function calcMeterAccuracy(e) {
    const requiredValuesExist =
        impNumMeterCheck.value !== '' &&
        impsMeterCheck.value !== '' &&
        voltageMeterCheck.value !== '' &&
        currentMeterCheck.value !== '' &&
        currentTransformerTransformationRatio.value !== '' &&
        powerFactor.value !== '' &&
        (!threePhaseMeterCheckBox.checked ||
            (voltageMeterCheck_B.value !== '' &&
                currentMeterCheck_B.value !== '' &&
                voltageMeterCheck_C.value !== '' &&
                currentMeterCheck_C.value !== ''));

    if (!requiredValuesExist) {
        document.getElementById('RealMeterPower').textContent = '';
        document.getElementById('MeterAccuracy').textContent = '';
        return;
    }

    updatePower();

    const timeHours = hours + minutes / 60 + seconds / 3600;
    if (!isFinite(timeHours) || timeHours <= 0) return;
    if (!isFinite(power) || power === 0) return;

    const realPower = impNumMeterCheck.value / impsMeterCheck.value / timeHours * 1000;
    if (!isFinite(realPower)) return;

    const accuracy = (power - realPower) / power * 100;
    if (!isFinite(accuracy)) return;

    document.getElementById('RealMeterPower').textContent = 'Pфакт = ' + realPower.toFixed(1).toString() + ' Вт;';
    document.getElementById('MeterAccuracy').textContent = 'Погрешность = ' + accuracy.toFixed(1).toString() + ' %';
}

function calcMeterAccuracyAndShowRes(e) {
    /*if (seconds == 0.0 && minutes == 0 && hours == 0.0) {
        alert('Нажмите \"Старт\"');
    }*/
    e.preventDefault();

    if (voltageMeterCheck.value != '' && currentMeterCheck.value != '' && impNumMeterCheck.value != '' && impsMeterCheck.value != '') {
        if (!threePhaseMeterCheckBox.checked ||
            (voltageMeterCheck_B.value != '' && currentMeterCheck_B.value != '' && voltageMeterCheck_C.value != '' && currentMeterCheck_C.value != '')) {
            document.getElementById('resultMeterCheck').style["display"] = "";
        }
    }
    clearInterval(interval);
    StartMeterCheckBtn.innerText = 'Старт▶';
    StartMeterCheckBtn.style["background-color"] = "#77dd77";
    calcMeterAccuracy(e);
}

function clearALL() {
    threePhaseMeterBlock.style["display"] = "none";
    document.getElementById('FirstVoltageMeterLabel').innerText = 'U[В] = ';
    document.getElementById('FirstCurrentMeterLabel').innerText = 'I[А] = ';
}

const writeBtn = document.getElementById("copyResultButton");
writeBtn.addEventListener("click", copyResult);

async function copyResult(e) {
    e.preventDefault();

    const now = new Date();
    const meterNumber = document.getElementById('SMDSerialNumMeterCheck').value;
    const timeText = timer.textContent;

    const voltageBlock = threePhaseMeterCheckBox.checked
        ? `Ua = ${voltageMeterCheck.value} В;  \n\rIa = ${currentMeterCheck.value} A;  \n\rUb = ${voltageMeterCheck_B.value} В;  \n\rIb = ${currentMeterCheck_B.value} A;  \n\rUc = ${voltageMeterCheck_C.value} В;  \n\rIc = ${currentMeterCheck_C.value} A;`
        : `U = ${voltageMeterCheck.value} В;  \n\rI = ${currentMeterCheck.value} A;`;

    const textToCopy =
        `${now};\n\r` +
        `Номер ИПУ: ${meterNumber};\n\r` +
        `Время: ${timeText};\n\r` +
        `Ктт = ${currentTransformerTransformationRatio.value} о.е.;\n\r` +
        `${voltageBlock}\n\r` +
        `${calcPower.textContent}\n\r` +
        `${calcEnergy.textContent};\n\r` +
        `A = ${impsMeterCheck.value} имп/кВ*ч;  \n\r` +
        `n = ${impNumMeterCheck.value} имп;  \n\r` +
        `${document.getElementById('RealMeterPower').textContent}\n\r` +
        `${document.getElementById('MeterAccuracy').textContent}`;

    let ok = false;
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(textToCopy);
            ok = true;
        }
    } catch (err) {
        ok = false;
    }

    // Fallback for non-secure contexts / older browsers.
    if (!ok) {
        const ta = document.createElement('textarea');
        ta.value = textToCopy;
        ta.setAttribute('readonly', '');
        ta.style.position = 'absolute';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        ok = document.execCommand('copy');
        document.body.removeChild(ta);
    }

    if (ok && writeBtn.innerText !== 'Скопировано!') {
        const originalText = writeBtn.innerText;
        writeBtn.innerText = 'Скопировано!';
        setTimeout(() => {
            writeBtn.innerText = originalText;
        }, 1500);
    }
}