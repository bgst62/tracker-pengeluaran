let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

const form = document.getElementById("expense-form");

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const nama = document.getElementById('nama').value;
    const jumlah = document.getElementById('jumlah').value;
    const kategori = document.getElementById('kategori').value;

    const expense = {
        nama: nama,
        jumlah: Number(jumlah),
        kategori: kategori
    };
    expenses.push(expense);
    saveExpenses();
    renderExpenses();
    form.reset();
    console.log(expense);
});

function renderExpenses() {
    const list = document.getElementById('expense-list');
    list.innerHTML = '';

    let total = 0;

    expenses.forEach(function(item, index) {
        const li = document.createElement('li');
        li.textContent = item.nama + ' - Rp' + item.jumlah + ' (' + item.kategori + ')';

        const deleteBtn = document.createElement('button')
        deleteBtn.textContent = 'Hapus'
        deleteBtn.addEventListener('click', function() {
            expenses.splice(index, 1);
            saveExpenses();
            renderExpenses();
        });
        li.appendChild(deleteBtn);
        list.appendChild(li);
        
        total += item.jumlah;
    });

    document.getElementById('total').textContent = total;
};

function saveExpenses() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
};

renderExpenses();