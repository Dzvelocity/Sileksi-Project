document.addEventListener('DOMContentLoaded', () => {
    const addDeviceBtn = document.getElementById('addDevice');
    const deviceList = document.querySelector('.device-list');
    const totalUsageEl = document.getElementById('totalUsage');

    const deviceWattageMap = {
        'Televisi': 100,
        'Kulkas': 300,
        'AC': 400
    };

    let totalUsage = 0;

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

            // Update total usage
            totalUsage += wattage;
            updateTotalUsage();

            // Clear select field
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
        } else if (e.target.classList.contains('remove-btn')) {
            const deviceItem = e.target.closest('.device-item');
            const totalWattageEl = deviceItem.querySelector('.total-wattage');
            const totalWattage = parseInt(totalWattageEl.textContent);

            totalUsage -= totalWattage;
            deviceItem.remove();
            updateTotalUsage();
        }
    });

    // Add event listener for input changes
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
            }
        }
    });

    function updateTotalUsage() {
        totalUsageEl.textContent = totalUsage;
    }

    const resultEl = document.getElementById('result');
    const resultDescEl = document.getElementById('resultDesc');
    const capacityOptions = document.querySelectorAll('.capacity-btn, .capacity-btn-2');

    capacityOptions.forEach(option => {
        option.addEventListener('click', () => {
            const capacity = option.textContent.trim();
            const capacityValue = capacity === 'Other' ? prompt('Input your house electrical capacity (in VA):') : parseInt(capacity);

            if (isNaN(capacityValue)) {
                alert('Please input a valid number');
                return;
            }

            const isOptimal = totalUsage <= capacityValue;
            resultEl.textContent = isOptimal ? 'Optimal' : 'Not optimal';
            
            // Menampilkan pesan sesuai hasil
            resultDescEl.textContent = isOptimal ? "Your house electricity capacity can handle your device optimally" : "Your house electricity capacity can't handle your device optimally";

            capacityOptions.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Menambahkan kelas 'active' pada tombol yang diklik
            if (!option.classList.contains('active')) {
                option.classList.add('active');
            }
            
            // Menyesuaikan gaya berdasarkan hasil
            if (!isOptimal) {
                resultEl.style.backgroundColor = '#f44336'; // Warna latar merah
                resultEl.style.color = '#fff'; // Warna teks putih
            } else {
                resultEl.style.backgroundColor = '#E3F2C2'; // Kembali ke warna latar semula jika hasil optimal
                resultEl.style.color = '#00534F'; // Kembali ke warna teks semula jika hasil optimal
            }
        });
    });

    const capacityButtons = document.querySelectorAll('.capacity-btn, .capacity-btn-2');

    capacityButtons.forEach(button => {
        button.addEventListener('click', () => {
            const isActive = button.classList.contains('active');

            // Menghapus kelas 'active' dari semua kotak capacity-btn dan capacity-btn-2
            capacityButtons.forEach(btn => {
                btn.classList.remove('active');
            });

            // Jika sudah aktif, maka hapus kelas 'active' (kembali ke warna semula), jika belum aktif, tambahkan kelas 'active'
            if (!isActive) {
                button.classList.add('active');
            }
        });
    });
});
