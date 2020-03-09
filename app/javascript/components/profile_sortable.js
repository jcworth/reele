import Sortable from 'sortablejs';

const profileSortable = () => {
  const projects = document.getElementById('projects-cards');
  if (projects) {
    Sortable.create(projects, {
      handle: '.project-card',
      animation: 150,
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

export { profileSortable };

// import { Sortable, Swap } from 'sortablejs/modular/sortable.core.esm';
// Sortable.mount(new Swap());

// const featuredProject = document.getElementById('project-featured');

// const otherProjects = document.getElementById('cards');


// const projectFeature = new Sortable(featuredProject, {
//     group: 'projects',
//     animation: 150,
//     swap: true
// });

// const projects =  new Sortable(otherProjects, {
//     group: 'projects',
//     animation: 150,
//     swap: true
// });

// export { projectFeature, projects}
