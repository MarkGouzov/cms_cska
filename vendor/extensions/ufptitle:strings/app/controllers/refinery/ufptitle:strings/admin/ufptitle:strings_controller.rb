module Refinery
  module Ufptitle:strings
    module Admin
      class Ufptitle:stringsController < ::Refinery::AdminController

        crudify :'refinery/ufptitle:strings/ufptitle:string', :xhr_paging => true

      end
    end
  end
end
