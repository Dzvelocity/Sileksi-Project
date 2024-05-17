document.addEventListener('DOMContentLoaded', () => {
    const addDeviceBtn = document.getElementById('addDevice');
    const deviceList = document.querySelector('.device-list');
    const totalUsageEl = document.getElementById('totalUsage');

    const deviceWattageMap = {
        'Fridge': 70,
        'Microwave': 450,
        'Rice Cooker': 400,
        'Blender': 29,
        'Washing Machine': 170,
        'Vaccum Cleaner': 450,
        'Fan': 40,
        'TV': 55,
        'Iron': 300,
        'LED Lamp': 8,
        'AC': 360
    };

    let totalUsage = 0;
    let selectedCapacity = null;

    addDeviceBtn.addEventListener('click', () => {
        const deviceType = document.getElementById('deviceType').value;

        if (deviceType) {
            const wattage = deviceWattageMap[deviceType];
            const deviceItem = document.createElement('tr');
            deviceItem.className = 'device-item';
            deviceItem.innerHTML = `
                <td>${deviceType}</td>
                <td class="wattage">${wattage} Watt</td>
                <td class="quantity-control">
                    <button class="qty-btn">-</button>
                    <input type="number" value="1" min="1" class="qty-input">
                    <button class="qty-btn">+</button>
                </td>
                <td class="total-wattage">${wattage} Watt</td>
                <td><button class="remove-btn">Hapus</button></td>
            `;
            deviceList.appendChild(deviceItem);

            totalUsage += wattage;
            updateTotalUsage();
            updateResult();

            document.getElementById('deviceType').value = '';
        } else {
            alert('Please choose a device');
        }
    });

    deviceList.addEventListener('click', (e) => {
        if (e.target.classList.contains('qty-btn')) {
            const input = e.target.closest('.quantity-control').querySelector('input');
            const currentValue = parseInt(input.value);
            const wattageEl = e.target.closest('.device-item').querySelector('.wattage');
            const totalWattageEl = e.target.closest('.device-item').querySelector('.total-wattage');
            const wattage = parseInt(wattageEl.textContent);

            if (e.target.textContent === '-') {
                if (currentValue > 1) {
                    input.value = currentValue - 1;
                    totalUsage -= wattage;
                }
            } else {
                input.value = currentValue + 1;
                totalUsage += wattage;
            }

            totalWattageEl.textContent = `${wattage * parseInt(input.value)} Watt`;
            updateTotalUsage();
            updateResult();
        } else if (e.target.classList.contains('remove-btn')) {
            const deviceItem = e.target.closest('.device-item');
            const totalWattageEl = deviceItem.querySelector('.total-wattage');
            const totalWattage = parseInt(totalWattageEl.textContent);

            totalUsage -= totalWattage;
            deviceItem.remove();
            updateTotalUsage();
            updateResult();
        }
    });

    deviceList.addEventListener('input', (e) => {
        if (e.target.classList.contains('qty-input')) {
            const input = e.target;
            const currentValue = parseInt(input.value);
            const deviceItem = e.target.closest('.device-item');
            const wattageEl = deviceItem.querySelector('.wattage');
            const totalWattageEl = deviceItem.querySelector('.total-wattage');
            const wattage = parseInt(wattageEl.textContent);
            const oldTotalWattage = parseInt(totalWattageEl.textContent);

            if (!isNaN(currentValue) && currentValue > 0) {
                const newTotalWattage = wattage * currentValue;
                totalUsage += (newTotalWattage - oldTotalWattage);
                totalWattageEl.textContent = `${newTotalWattage} Watt`;
                updateTotalUsage();
                updateResult();
            }
        }
    });

    function updateTotalUsage() {
        totalUsageEl.textContent = totalUsage;
    }

    function updateResult() {
        const resultEl = document.getElementById('result');
        const resultDescEl = document.getElementById('resultDesc');

        if (selectedCapacity !== null) {
            const isOptimal = totalUsage <= selectedCapacity;
            resultEl.textContent = isOptimal ? 'Optimal' : 'Not optimal';
            resultDescEl.textContent = isOptimal ? "Your house electricity capacity can handle your device optimally" : "Your house electricity capacity can't handle your device optimally";

            if (isOptimal) {
                resultEl.style.backgroundColor = '#E3F2C2';
                resultEl.style.color = '#00534F';
            } else {
                resultEl.style.backgroundColor = '#f44336';
                resultEl.style.color = '#fff';
            }
        } else {
            resultEl.textContent = '';
            resultDescEl.textContent = '';
            resultEl.style.backgroundColor = '';
            resultEl.style.color = '';
        }
    }

    const capacityOptions = document.querySelectorAll('.capacity-btn, .capacity-btn-2');

    capacityOptions.forEach(option => {
        option.addEventListener('click', () => {
            const isActive = option.classList.contains('active');
            const capacity = option.textContent.trim();
            selectedCapacity = capacity === 'Other' ? parseInt(prompt('Input your house electrical capacity (in VA):')) : parseInt(capacity);

            if (isNaN(selectedCapacity)) {
                alert('Please input a valid number');
                selectedCapacity = null;
                return;
            }

            capacityOptions.forEach(btn => {
                btn.classList.remove('active');
            });

            if (!isActive) {
                option.classList.add('active');
            } else {
                selectedCapacity = null;
            }

            updateResult();
        });
    });
});
