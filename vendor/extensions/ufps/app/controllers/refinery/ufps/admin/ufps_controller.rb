module Refinery
  module Ufps
    module Admin
      class UfpsController < ::Refinery::AdminController

        crudify :'refinery/ufps/ufp', :xhr_paging => true

      end
    end
  end
end
