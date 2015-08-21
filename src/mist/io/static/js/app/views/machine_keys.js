define('app/views/machine_keys', ['app/views/controlled'],
    //
    //  Machine Keys View
    //
    //  @returns Class
    //
    function (ControlledView) {
        return App.MachineKeysView = ControlledView.extend({


            //
            //
            //  Properties
            //
            //


            selectedKey: null,


            //
            //
            //  Methods
            //
            //


            renderNonAssocatedKeys: function () {
                Ember.run.next(function () {
                    $('#non-associated-keys-popup .ui-listview').listview('refresh');
                });
            },


            //
            //
            //  Actions
            //
            //

            actions: {


                associateClicked: function () {
                    $('#non-associated-keys-popup').popup('option',
                        'positionTo', '#mist-manage-keys');
                    $('#non-associated-keys-popup').popup('open');
                },


                customAssociateClicked: function(){
                    var machinesCtrl = Mist.machineKeysController;
                    $("#machine-userPort-popup").popup('close');
                    // Possible change this to selected key TODO check
                    machinesCtrl.associate(machinesCtrl.lastAssocKey,null,machinesCtrl.user,machinesCtrl.port);
                },


                nonAssociatedKeyClicked: function (key) {
                    $('#non-associated-keys-popup').popup('close');
                    Mist.machineKeysController.associate(key);

                    // In case user associates key from "Add key" button
                    $('#machine-keys-panel').panel('open');
                },


                newKeyClicked: function() {
                    $('#non-associated-keys-popup').popup('close');
                    Ember.run.later(function() {
                        Mist.keyAddController.open(function(success, key) {
                            if (success) {
                                Mist.machineKeysController.associate(Mist.keysController.getKey(key.id));

                                // In case user associates key from "Add key" button
                                $('#machine-keys-panel').panel('open');
                            }
                        });
                    }, 300);
                },


                removeClicked: function () {
                    Mist.machineKeysController.disassociate(this.selectedKey);
                    $('#key-actions-popup').popup('close');
                },


                probeClicked: function () {
                    Mist.machineKeysController.probe(this.selectedKey);
                    $('#key-actions-popup').popup('close');
                },


                viewClicked: function () {
                    $('#key-actions-popup').popup('close');
                    Ember.run.later(this, function () {
                        Mist.Router.router.transitionTo('key', this.selectedKey);
                    }, 250);
                },


                cancelClicked: function () {
                    this.set('selectedKey', null);
                    $('#key-actions-popup').popup('close');
                },


                backClicked: function () {
                    Mist.machineKeysController.close();
                }
            },


            //
            //
            //  Observers
            //
            //


            nonAssociatedKeysObserver: function () {
                Ember.run.once(this, 'renderNonAssocatedKeys');
            }.observes('Mist.machineKeysController.nonAssociatedKeys')
        });
    }
);
