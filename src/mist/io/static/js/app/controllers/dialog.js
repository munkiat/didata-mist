define('app/controllers/dialog', ['ember'],
    //
    //  Dialog Controller
    //
    //  @returns Class
    //
    function () {

        'use strict';

        return Ember.Object.extend({


            //
            //
            //  Properties
            //
            //


            view: null,
            callback: null,
            options: Ember.Object.create({
                head: null,
                body: null,
                type: null,
            }),


            //
            //
            //  Methods
            //
            //


            open: function (args) {
                this._clear();
                this._parseArgs(args);
                this.view.open();
            },


            close: function () {
                this.view.close();
                this._clear();
            },


            reject: function () {
                if (this.callback)
                    this.callback(false);
                this.close();
            },


            confirm: function () {
                if (this.callback)
                    this.callback(true);
                this.close();
            },


            //
            //
            //  Pseudo-Private Methods
            //
            //


            _clear: function () {
                this.setProperties({
                    type: null,
                    callback: null,
                });
                this.options.setProperties({
                    head: null,
                    body: null,
                    type: null,
                });
            },


            _parseArgs: function (args) {
                this.setProperties({
                    type: args.type,
                    callback: args.callback,
                });
                this.options.setProperties({
                    head: args.head,
                    body: args.body,
                    type: args.type,
                });
            }
        });
    }
);
