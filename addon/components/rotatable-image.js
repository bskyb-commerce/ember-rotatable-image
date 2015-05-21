import Em from 'ember';
import DomElement from '../mixins/dom-element';

export default Em.Component.extend(DomElement, {
  classNames: ['rotatable-image-container'],
  classNameBindings: ['loaded'],
  attributeBindings: ['style'],
  loaded: false,

  style: Em.computed('height', function() {
    var height = this.get('height');

    return 'line-height: ' + (height - 1) + 'px;';
  }),

  handleLoaded: function() {
    var component = this;
    component.set('loaded', false);
    this.$().children('img').one('load', function() {
      Em.run(function() {
        component.set('loaded', true);
      });
    }.bind(this));
  }.observes('src').on('didInsertElement'),

  actions: {
    onRotateImageRight: function() {
      this.trigger('rotate', 90);
    }
  }
});
