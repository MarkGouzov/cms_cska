require 'spec_helper'

module Refinery
  module Ufptitle:strings
    describe Ufptitle:string do
      describe "validations" do
        subject do
          FactoryGirl.create(:ufptitle:string)
        end

        it { should be_valid }
        its(:errors) { should be_empty }
      end
    end
  end
end
