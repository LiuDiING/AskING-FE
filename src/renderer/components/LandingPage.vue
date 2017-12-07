<template>
  <div class="main">
    <!-- <Tabs type="card" :value="activeTab" closable :animated="false" @on-tab-remove="handleTabRemove">
      <Tab-pane v-for="tab in tabs" :name="tab.name" :label="shortName(tab.name)">
        <home-page v-model="tab.name"></home-page>
      </Tab-pane>
      <Button class="add-button" type="ghost" @click="handleTabsAdd" slot="extra" icon="plus-round" shape="circle" size="small"></Button>
    </Tabs> -->

    <home-page v-model="activeTab"></home-page>
  </div>
</template>

<script>
  import SystemInformation from './LandingPage/SystemInformation'
  import HomePage from './HomePage'

  export default {
    name: 'landing-page',
    components: {
      SystemInformation,
      HomePage
    },
    data () {
      return {
        tabs: [
          {
            name: 'Default'
          }
        ],
        activeTab: 'Node Legal Name'
      }
    },
    methods: {
      shortName (fullName) {
        return fullName.split(',')[0].split('=')[1]
      },
      handleTabsAdd () {
        this.tabs.push({
          name: 'Default'
        })
      },
      handleTabRemove (name) {
        let idx = this.tabs.indexOf(name)
        if (idx !== -1) {
          this.tabs.splice(idx, 1)
        }
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  body { font-family: 'Source Sans Pro', sans-serif; }

</style>
