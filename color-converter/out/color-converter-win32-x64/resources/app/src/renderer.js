const dialog = require('electron').remote.dialog;
const options = {
    type: 'error',
   	buttons: ['Ok'],
    defaultId: 2,
    title: 'Error',
    message: 'Going beyond',
    detail: 'Impossible to convert'
};

function numberHsvToOther() {
	let hsvH = parseFloat(document.getElementById('number-hsv-h').value);
	let hsvS = parseFloat(document.getElementById('number-hsv-s').value);
	let hsvV = parseFloat(document.getElementById('number-hsv-v').value);

	if (hsvH > 1 || hsvH < 0 || hsvS > 1 || hsvS < 0 || hsvV > 1 || hsvV < 0) {
  		dialog.showMessageBox(null, options, null);

		return;
	}

	document.getElementById('range-hsv-h').value = hsvH * 100;
	document.getElementById('range-hsv-s').value = hsvS * 100;
	document.getElementById('range-hsv-v').value = hsvV * 100;

	hsvToOther(hsvH, hsvS, hsvV);
}

function rangeHsvToOther() {
	let hsvH = parseInt(document.getElementById('range-hsv-h').value);
	let hsvS = parseInt(document.getElementById('range-hsv-s').value);
	let hsvV = parseInt(document.getElementById('range-hsv-v').value);

	document.getElementById('number-hsv-h').value = hsvH / 100;
	document.getElementById('number-hsv-s').value = hsvS / 100;
	document.getElementById('number-hsv-v').value = hsvV / 100;

	hsvToOther(hsvH / 100, hsvS / 100, hsvV / 100);
}

function hsvToOther(hsvH, hsvS, hsvV) {
	let rgb = hsvToRgb(hsvH, hsvS, hsvV);
	let xyz = rgbToXyz(rgb[0], rgb[1], rgb[2]);

	if (xyz[0] > 95.0456) {
		document.getElementById('number-xyz-x').value = 95.0456;
	} else if (xyz[0] < 0) {
		document.getElementById('number-xyz-x').value = 0;
	} else {
		document.getElementById('number-xyz-x').value = xyz[0];
	}

	if (xyz[1] > 100) {
		document.getElementById('number-xyz-y').value = 100;
	} else if (xyz[1] < 0) {
		document.getElementById('number-xyz-y').value = 0;
	} else {
		document.getElementById('number-xyz-y').value = xyz[1];
	}

	if (xyz[2] > 108.8754) {
		document.getElementById('number-xyz-z').value = 108.8754;
	} else if (xyz[2] < 0) {
		document.getElementById('number-xyz-z').value = 0;
	} else {
		document.getElementById('number-xyz-z').value = xyz[2];
	}

    document.getElementById('range-xyz-x').value = xyz[0];
    document.getElementById('range-xyz-y').value = xyz[1];
    document.getElementById('range-xyz-z').value = xyz[2];

    let lab = xyzToLab(xyz[0], xyz[1], xyz[2]);

    if (lab[0] > 100) {
		document.getElementById('number-lab-l').value = 100;
	} else if (lab[0] < 0) {
		document.getElementById('number-lab-l').value = 0;
	} else {
		document.getElementById('number-lab-l').value = lab[0];
	}

	if (lab[1] > 128) {
		document.getElementById('number-lab-a').value = 128;
	} else if (lab[1] < -128) {
		document.getElementById('number-lab-a').value = -128;
	} else {
		document.getElementById('number-lab-a').value = lab[1];
	}

	if (lab[2] > 128) {
		document.getElementById('number-lab-b').value = 128;
	} else if (lab[2] < -128) {
		document.getElementById('number-lab-b').value = -128;
	} else {
		document.getElementById('number-lab-b').value = lab[2];
	}

    document.getElementById('range-lab-l').value = lab[0];
    document.getElementById('range-lab-a').value = lab[1];
    document.getElementById('range-lab-b').value = lab[2];

    document.getElementById('current-color').style.backgroundColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}

function numberXyzToOther() {
	let xyzX = parseFloat(document.getElementById('number-xyz-x').value);
	let xyzY = parseFloat(document.getElementById('number-xyz-y').value);
	let xyzZ = parseFloat(document.getElementById('number-xyz-z').value);

	if (xyzX > 95.0456 || xyzX < 0 || xyzY > 100 || xyzY < 0 || xyzZ > 108.8754 || xyzZ < 0) {
		dialog.showMessageBox(null, options, null);

		return
	}

	document.getElementById('range-xyz-x').value = xyzX;
	document.getElementById('range-xyz-y').value = xyzY;
	document.getElementById('range-xyz-z').value = xyzZ;

	xyzToOther(xyzX, xyzY, xyzZ);
}

function rangeXyzToOther() {
	let xyzX = parseInt(document.getElementById('range-xyz-x').value);
	let xyzY = parseInt(document.getElementById('range-xyz-y').value);
	let xyzZ = parseInt(document.getElementById('range-xyz-z').value);

	document.getElementById('number-xyz-x').value = xyzX;
	document.getElementById('number-xyz-y').value = xyzY;
	document.getElementById('number-xyz-z').value = xyzZ;

	xyzToOther(xyzX, xyzY, xyzZ);
}

function xyzToOther(xyzX, xyzY, xyzZ) {
	let lab = xyzToLab(xyzX, xyzY, xyzZ);

    if (lab[0] > 100) {
		document.getElementById('number-lab-l').value = 100;
	} else if (lab[0] < 0) {
		document.getElementById('number-lab-l').value = 0;
	} else {
		document.getElementById('number-lab-l').value = lab[0];
	}

	if (lab[1] > 128) {
		document.getElementById('number-lab-a').value = 128;
	} else if (lab[1] < -128) {
		document.getElementById('number-lab-a').value = -128;
	} else {
		document.getElementById('number-lab-a').value = lab[1];
	}

	if (lab[2] > 128) {
		document.getElementById('number-lab-b').value = 128;
	} else if (lab[2] < -128) {
		document.getElementById('number-lab-b').value = -128;
	} else {
		document.getElementById('number-lab-b').value = lab[2];
	}

    document.getElementById('range-lab-l').value = lab[0];
    document.getElementById('range-lab-a').value = lab[1];
    document.getElementById('range-lab-b').value = lab[2];

	let rgb = xyzToRgb(xyzX, xyzY, xyzZ);
	let hsv = rgbToHsv(rgb[0], rgb[1], rgb[2]);

	if (hsv[0] > 1) {
		document.getElementById('number-hsv-h').value = 1;
	} else if (hsv[0] < 0) {
		document.getElementById('number-hsv-h').value = 0;
	} else {
		document.getElementById('number-hsv-h').value = hsv[0];
	}

	if (hsv[1] > 1) {
		document.getElementById('number-hsv-s').value = 1;
	} else if (hsv[1] < 0) {
		document.getElementById('number-hsv-s').value = 0;
	} else {
		document.getElementById('number-hsv-s').value = hsv[1];
	}

	if (hsv[2] > 1) {
		document.getElementById('number-hsv-v').value = 1;
	} else if (hsv[2] < 0) {
		document.getElementById('number-hsv-v').value = 0;
	} else {
		document.getElementById('number-hsv-v').value = hsv[2];
	}

    document.getElementById('range-hsv-h').value = hsv[0] * 100;
    document.getElementById('range-hsv-s').value = hsv[1] * 100;
    document.getElementById('range-hsv-v').value = hsv[2] * 100;

    document.getElementById('current-color').style.backgroundColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}

function numberLabToOther() {
	let labL = parseFloat(document.getElementById('number-lab-l').value);
    let labA = parseFloat(document.getElementById('number-lab-a').value);
    let labB = parseFloat(document.getElementById('number-lab-b').value);

    if (labL > 100 || labL < 0 || labA > 128 || labA < -128 || labB > 128 || labB < -128) {
		dialog.showMessageBox(null, options, null);

    	return
    }

    document.getElementById('range-lab-l').value = labL;
    document.getElementById('range-lab-a').value = labA;
    document.getElementById('range-lab-b').value = labB;

    labToOther(labL, labA, labB);
}

function rangeLabToOther() {
	let labL = parseInt(document.getElementById('range-lab-l').value);
    let labA = parseInt(document.getElementById('range-lab-a').value);
    let labB = parseInt(document.getElementById('range-lab-b').value);

    document.getElementById('number-lab-l').value = labL;
    document.getElementById('number-lab-a').value = labA;
    document.getElementById('number-lab-b').value = labB;

    labToOther(labL, labA, labB);
}

function labToOther(labL, labA, labB) {
	let xyz = labToXyz(labL, labA, labB);

    if (xyz[0] > 95.0456) {
		document.getElementById('number-xyz-x').value = 95.0456;
	} else if (xyz[0] < 0) {
		document.getElementById('number-xyz-x').value = 0;
	} else {
		document.getElementById('number-xyz-x').value = xyz[0];
	}

	if (xyz[1] > 100) {
		document.getElementById('number-xyz-y').value = 100;
	} else if (xyz[1] < 0) {
		document.getElementById('number-xyz-y').value = 0;
	} else {
		document.getElementById('number-xyz-y').value = xyz[1];
	}

	if (xyz[2] > 108.8754) {
		document.getElementById('number-xyz-z').value = 108.8754;
	} else if (xyz[2] < 0) {
		document.getElementById('number-xyz-z').value = 0;
	} else {
		document.getElementById('number-xyz-z').value = xyz[2];
	}

    document.getElementById('range-xyz-x').value = xyz[0];
    document.getElementById('range-xyz-y').value = xyz[1];
    document.getElementById('range-xyz-z').value = xyz[2];

    let rgb = xyzToRgb(xyz[0], xyz[1], xyz[2]);
    let hsv = rgbToHsv(rgb[0], rgb[1], rgb[2]);

    if (hsv[0] > 1) {
		document.getElementById('number-hsv-h').value = 1;
	} else if (hsv[0] < 0) {
		document.getElementById('number-hsv-h').value = 0;
	} else {
		document.getElementById('number-hsv-h').value = hsv[0];
	}

	if (hsv[1] > 1) {
		document.getElementById('number-hsv-s').value = 1;
	} else if (hsv[1] < 0) {
		document.getElementById('number-hsv-s').value = 0;
	} else {
		document.getElementById('number-hsv-s').value = hsv[1];
	}

	if (hsv[2] > 1) {
		document.getElementById('number-hsv-v').value = 1;
	} else if (hsv[2] < 0) {
		document.getElementById('number-hsv-v').value = 0;
	} else {
		document.getElementById('number-hsv-v').value = hsv[2];
	}

    document.getElementById('range-hsv-h').value = hsv[0] * 100;
    document.getElementById('range-hsv-s').value = hsv[1] * 100;
    document.getElementById('range-hsv-v').value = hsv[2] * 100;

    document.getElementById('current-color').style.backgroundColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}

function hsvToRgb(hsvH, hsvS, hsvV) {
	let i = Math.floor(hsvH * 6);
    let f = hsvH * 6 - i;
    let p = hsvV * (1 - hsvS);
    let q = hsvV * (1 - f * hsvS);
    let t = hsvV * (1 - (1 - f) * hsvS);

    let rgbR;
    let rgbG;
    let rgbB;

    switch (i % 6) {
    	case 0: {
        	rgbR = hsvV;
        	rgbG = t;
        	rgbB = p;
    	}
        
        break;

    	case 1: {
        	rgbR = q;
        	rgbG = hsvV;
        	rgbB = p;
      	}
        
        break;

    	case 2: {
        	rgbR = p;
        	rgbG = hsvV;
        	rgbB = t;
      	}
        
        break;

      	case 3: {
        	rgbR = p;
        	rgbG = q;
        	rgbB = hsvV;
      	}
        
        break;

      	case 4: {
        	rgbR = t;
        	rgbG = p;
        	rgbB = hsvV;
      	}
        
        break;

      	case 5: {
        	rgbR = hsvV;
        	rgbG = p;
        	rgbB = q;
      	}
        
        break;
    }

    rgbR = Math.round(rgbR * 255);
    rgbG = Math.round(rgbG * 255);
    rgbB = Math.round(rgbB * 255);

    return [rgbR, rgbG, rgbB];
}

function rgbToXyz(rgbR, rgbG, rgbB) {
	let rn = rgbToXyzF(rgbR / 255) * 100;
    let gn = rgbToXyzF(rgbG / 255) * 100;
    let bn = rgbToXyzF(rgbB / 255) * 100;

    let xyzX = 0.412453 * rn + 0.35758 * gn + 0.180423 * bn;
    let xyzY = 0.212671 * rn + 0.71516 * gn + 0.072169 * bn;
    let xyzZ = 0.019334 * rn + 0.119193 * gn + 0.950227 * bn;

    return [xyzX, xyzY, xyzZ];
}

function rgbToHsv(rgbR, rgbG, rgbB) {
	let max = Math.max(rgbR, rgbG, rgbB);
    let min = Math.min(rgbR, rgbG, rgbB);
    let d = max - min;
    let hsvH;
    let hsvS = (max === 0 ? 0 : d / max);
    let hsvV = max / 255;

    switch (max) {
    	case min:
        	hsvH = 0;

        break;

    	case rgbR:
        	hsvH = (rgbG - rgbB) + d * (rgbG < rgbB ? 6 : 0);
        	hsvH /= 6 * d;
        
        break;
      
      	case rgbG:
        	hsvH = (rgbB - rgbR) + d * 2;
        	hsvH /= 6 * d;
        
        break;
     	
     	case rgbB:
        	hsvH = (rgbR - rgbG) + d * 4;
        	hsvH /= 6 * d;
        
        break;
    }

    return [hsvH, hsvS, hsvV];
}

function xyzToLab(xyzX, xyzY, xyzZ) {
	let labL = 116 * xyzToLabF(xyzY / 100) - 16;
    let labA = 500 * (xyzToLabF(xyzX / 95.047) - xyzToLabF(xyzY / 100));
    let labB = 200 * (xyzToLabF(xyzY / 100) - xyzToLabF(xyzZ / 108.883));

    return [labL, labA, labB];
}

function xyzToRgb(xyzX, xyzY, xyzZ) {
	let rn = 3.2406 * xyzX / 100 - 1.5372 * xyzY / 100 - 0.4986 * xyzZ / 100;
	let gn = -0.9689 * xyzX / 100 + 1.8758 * xyzY / 100 + 0.0415 * xyzZ / 100;
	let bn = 0.0557 * xyzX / 100 - 0.204 * xyzY / 100 + 1.057 * xyzZ / 100;

	let rgbR = xyzToRgbF(rn) * 255;
	let rgbG = xyzToRgbF(gn) * 255;
	let rgbB = xyzToRgbF(bn) * 255;

	return [rgbR, rgbG, rgbB];
}

function labToXyz(labL, labA, labB) {
	let xyzX = labToXyzF(labA / 500 + (labL + 16) / 116) * 100;
	let xyzY = labToXyzF((labL + 16) / 116) * 95.047;
	let xyzZ = labToXyzF((labL + 16) / 116 - labB / 200) * 108.883;

	return [xyzX, xyzY, xyzZ];
}

function rgbToXyzF(x) {
	if (x >= 0.04045) {
		return Math.pow((x + 0.055) / 1.005, 2.4);
	} else {
		return x / 12.96;
	}
}

function xyzToLabF(x) {
	if (x >= 0.008856) {
		return Math.pow(x, 1 / 3);
	} else {
		return (7.787 * x + 16 / 116);
	}
}

function xyzToRgbF(x) {
	if (x >= 0.0031308) {
		return (1.055 * Math.pow(x, 1 / 2.4) - 0.055);
	} else {
		return 12.92 * x;
	}
}

function labToXyzF(x) {
	if (Math.pow(x, 3) >= 0.008856) {
		return Math.pow(x, 3);
	} else {
		return (x - 16 / 116) / 7.787;
	}
}