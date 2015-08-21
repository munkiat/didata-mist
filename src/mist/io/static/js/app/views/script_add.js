define('app/views/script_add', ['app/views/panel'],
    //
    //  Script Add View
    //
    //  @returns Class
    //
    function (PanelView) {

        'use strict';

        var DEFAULT_URL = 'http://';
        var DEFAULT_GITHUB_URL = 'https://github.com/owner/repo';
        var DEFAULT_SCRIPT = '#!/bin/bash\necho "hello world"';
        var DEFAULT_ANSIBLE_SCRIPT = '- name: Dummy ansible playbook\n' +
            '  hosts: localhost\n' +
            '  tasks:\n' +
            '  - name: Dummy task\n' +
            '    debug:\n' +
            '      msg: "Hello World"\n';

        return App.ScriptAddView = PanelView.extend({


            //
            //
            //  Properties
            //
            //


            scriptTypes: [{
                label: 'Ansible Playbook',
                value: 'ansible'
            }, {
                label: 'Executable',
                value: 'executable'
            }],


            scriptSources: [{
                label: 'Github',
                value: 'github'
            }, {
                label: 'URL',
                value: 'url',
            }, {
                label: 'Inline',
                value: 'inline'
            }],


            //
            //
            //  Computed Properties
            //
            //


            isReady: function () {
                var script = Mist.scriptAddController.get('newScript');
                var name = script.get('name');
                var type = script.get('type');
                var source = script.get('source');
                if (!type || !source || !name)
                    return false;
                if (source.value == 'inline')
                    return script.get('script');
                return script.get('url');
            }.property(
                'Mist.scriptAddController.newScript.name',
                'Mist.scriptAddController.newScript.source',
                'Mist.scriptAddController.newScript.type',
                'Mist.scriptAddController.newScript.url',
                'Mist.scriptAddController.newScript.script'
            ),


            //
            //
            //  Methods
            //
            //


            clear: function () {
                this.$('.source').hide();
                this.$('#script-add-description').hide();
                this.closeTypeSelect();
                this.closeSourceSelect();
            },


            selectType: function (type) {
                this.closeTypeSelect();
                Mist.scriptAddController.get('newScript').set('type', type);
                this.setScript();
            },


            setScript: function () {
                var newScript = Mist.scriptAddController.get('newScript');
                var type = newScript.get('type');
                if (type.value == 'ansible')
                    newScript.set('script', DEFAULT_ANSIBLE_SCRIPT);
                if (type.value == 'executable')
                    newScript.set('script', DEFAULT_SCRIPT);
            },


            selectSource: function (source) {
                this.closeSourceSelect();
                this.showSourceBundle(source);
                var newScript = Mist.scriptAddController.get('newScript');
                newScript.set('source', source);
                if (source.value == 'url')
                    newScript.set('url', DEFAULT_URL);
                if (source.value == 'github')
                    newScript.set('url', DEFAULT_GITHUB_URL);
                if (source.value == 'inline')
                    this.setScript();
            },


            closeTypeSelect: function () {
                this.$('#script-add-type .mist-select').collapsible('collapse');
            },


            closeSourceSelect: function () {
                this.$('#script-add-source .mist-select').collapsible('collapse');
            },


            showSourceBundle: function (source) {
                this.$('.source').hide();
                this.$('.'+source.value).slideDown();
                this.$('#script-add-description').slideDown();
            },


            //
            //
            //  Actions
            //
            //


            actions: {

                selectType: function (type) {
                    this.selectType(type);
                },

                selectSource: function (source) {
                    this.selectSource(source);
                },

                backClicked: function () {
                    Mist.scriptAddController.close();
                },

                addClicked: function () {
                    Mist.scriptAddController.add();
                }
            },
        });
    }
);
