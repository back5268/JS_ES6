const saveButton = document.querySelector('#saveButton');
const sortButton = document.querySelector('#sortButton');
const updateButton = document.querySelector('#updateButton');
const deleteButton = document.querySelector('#deleteButton');
const searchButton = document.querySelector('#searchButton');
const tbody = document.querySelector('tbody');

let persons = [
    { id: 1, name: 'Nam', age: 21, gender: true },
    { id: 2, name: 'Dung', age: 20, gender: true },
    { id: 3, name: 'Dung', age: 19, gender: false },
    { id: 4, name: 'Hong', age: 20, gender: false },
];

const getValue = () => {
    const idInput = document.querySelector('#id').value;
    const name = document.querySelector('#name').value;
    const ageInput = document.querySelector('#age').value;
    const genderInput = document.querySelector('input[name="gender"]:checked').value;

    if (!idInput || !name || !ageInput || !genderInput) {
        alert('Invalid input');
        return;
    }

    const id = Number(idInput);
    const age = Number(ageInput);
    const gender = Boolean(genderInput);
    let person = { id, name, age, gender };
    return person;
}

const show = (p) => {
    for (const { id, name, age, gender } of p) {
        let row = tbody.insertRow();
        row.classList.add('detail');
        row.insertCell().innerHTML = id;
        row.insertCell().innerHTML = name;
        row.insertCell().innerHTML = age;
        row.insertCell().innerHTML = gender ? 'Male' : 'Female';
    }

    let detail = document.querySelectorAll('.detail');
    detail.forEach(data => {
        data.addEventListener('click', event => {
            deleteButton.classList.remove('disabled');
            updateButton.classList.remove('disabled');
            const info = event.target.closest('tr');

            document.querySelector('#id').setAttribute("disabled", true);
            document.querySelector('#id').value = Number(info.querySelectorAll('td')[0].innerHTML);
            document.querySelector('#name').value = info.querySelectorAll('td')[1].innerHTML;
            document.querySelector('#age').value = Number(info.querySelectorAll('td')[2].innerHTML);
            (info.querySelectorAll('td')[3].innerHTML === 'Male') ? document.getElementById('male').checked = true : document.getElementById('female').checked = true;
        });
    });
};
show(persons);

saveButton.addEventListener('click', () => {
    let person = getValue();

    const isExist = persons.some(p => p.id === person.id);
    if (isExist) {
        const id = document.querySelector('#id');
        alert('Id already exists!');
        id.value = '';
        return;
    }
    persons.push(person);

    tbody.innerHTML = '';
    show(persons);
});

sortButton.addEventListener('click', () => {
    persons.sort((a, b) => {
        if (a.name === b.name) {
            return a.age - b.age;
        } else {
            return a.name.localeCompare(b.name);
        }
    });

    tbody.innerHTML = '';
    show(persons);
});

searchButton.addEventListener('click', () => {
    let min = Number(document.querySelector('#min').value);
    let max = Number(document.querySelector('#max').value);

    min = min ? min : 0;
    max = max ? max : 120;

    const search = () => persons.filter(p => p.age >= min && p.age <= max);
    tbody.innerHTML = '';
    show(search());
});

updateButton.addEventListener('click', () => {
    let person = getValue();
    const index = persons.findIndex(p => p.id === person.id);
    persons[index] = person;
    tbody.innerHTML = '';
    show(persons);
})

deleteButton.addEventListener('click', () => {
    alert('Are you sure you want to delete!');
    let person = getValue();
    const index = persons.findIndex(p => p.id === person.id);
    persons.splice(index, 1);
    tbody.innerHTML = '';
    show(persons);
})