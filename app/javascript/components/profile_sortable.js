import Sortable, { Swap } from 'sortablejs';

const profileSortable = () => {
  const projects = document.getElementById('projects-cards');
  if (projects) {
    Sortable.create(projects, {
      handle: '.project-card',
      animation: 250,
      swap: true,
      put: true,
      // onDrop: function (evt) {
      //   evt.currentTarge.classList.add('.project-card');
      //   evt.currentTarge.classList.remove('.user-featured-project-card');

      // },
      group: 'projects',
      store: {
        get: function (sortable) {
          var order = localStorage.getItem(sortable.options.group.name);
          return order ? order.split('|') : [];
        },

        set: function (sortable) {
          var order = sortable.toArray();
          localStorage.setItem(sortable.options.group.name, order.join('|'));
        }
    }
  });
  };
};

// const button = document.getElementById('clickme');

// button.addEventListener('click', (event) => {
//   event.currentTarget.innerText = "Bingo!";
//   event.currentTarget.classList.add('disabled');
//   event.currentTarget.setAttribute('disabled', '');
//   const audio = new Audio('../sound.mp3');
//   audio.play();
// });

const featuredSortable = ( ) => {
  const featured = document.getElementById('featured-project');
  if (featured) {
    Sortable.create(featured, {
      handle: 'user-featured-project-card',
      animation: 150,
      swap: true,
      sort: false,
      put: true,
      group: 'projects',
      store: {
        get: function (sortable) {
          var order = localStorage.getItem(sortable.options.group.name);
          return order ? order.split('|') : [];
        },

        set: function (sortable) {
          var order = sortable.toArray();
          localStorage.setItem(sortable.options.group.name, order.join('|'));
        }
    }
    });
  };
};

export { profileSortable, featuredSortable };

