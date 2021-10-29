const setCanvas = (str: string, str2: string) => {
    const id = '1.23452384164.123412415';
    const element = document.getElementById(id);
    if (element) {
        document.body.removeChild(element);
    }

    const can = document.createElement('canvas');
    can.width = 150;
    can.height = 120;

    const cans = can.getContext('2d');
    if (cans){
        cans.rotate(-20 * Math.PI / 180);
        cans.font = '18px Vedana';
        cans.fillStyle = 'rgba(0, 0, 0, 0.08)';
        cans.textAlign = 'center';
        // cans.textBaseline = 'Middle';
        cans.fillText(str, 15, 120 );
        cans.fillText(str2, 15, 65);
    }
  

    const div = document.createElement('div');
    div.id = id;
    div.style.pointerEvents = 'none';
    div.style.top = '0px';
    div.style.left = '0px';
    div.style.position = 'fixed';
    // div.style.yOffset = 13;
    div.style.zIndex = '100000';
    div.style.width = `${document.documentElement.clientWidth   }px`;
    div.style.height = `${document.documentElement.clientHeight   }px`;
    div.style.background = `url(${  can.toDataURL('image/png')  }) left top repeat`;
    document.body.appendChild(div);
    return id;
};


export const SetWatermark = (str: string, str2: string) => {
    let id = setCanvas(str, str2);
    setInterval(() => {
        if (document.getElementById(id) === null) {
            id = setCanvas(str,str2);
        }
    }, 2000);
    window.onresize = () => {
        setCanvas(str, str2);
    };
};
